
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FILMS } from '../constants';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const film = FILMS.find(f => f.id === id);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [quality, setQuality] = useState<string>('Auto');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play might be blocked, UI stays in paused state
          });
        }
      } else {
        videoRef.current.pause();
      }
      // State updates are handled by onPlay/onPause event listeners
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
      setHasError(false);
    }
  };

  const handleWaiting = () => {
    if (!showEndScreen) setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handlePlaying = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleError = () => {
    // Avoid logging the circular event object 'e' directly
    console.error("Video stream encountered a problem.");
    setIsLoading(false);
    setHasError(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (videoRef.current) {
      videoRef.current.volume = v;
      setIsMuted(v === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      videoRef.current.muted = nextMuted;
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showSettingsMenu) setShowControls(false);
    }, 3000);
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  if (!film) return <div className="p-20 text-center text-2xl font-serif">Film Not Found</div>;

  return (
    <div className="bg-black min-h-screen pt-20">
      <section 
        ref={containerRef}
        className="relative aspect-video max-w-7xl mx-auto bg-neutral-900 overflow-hidden shadow-2xl group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {!showEndScreen ? (
          <>
            {/* Loading Indicator */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Requesting Stream...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-50 text-center p-6">
                <div className="max-w-md">
                  <div className="text-4xl mb-4">🏛️</div>
                  <h3 className="text-xl font-serif mb-2">Heritage Link Unavailable</h3>
                  <p className="text-neutral-500 text-sm mb-6">Archive.org is currently experiencing high latency. The film data cannot be retrieved at this moment.</p>
                  <button 
                    onClick={() => { setHasError(false); setIsLoading(true); if(videoRef.current) videoRef.current.load(); }}
                    className="text-white border border-neutral-700 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Retry Archive Request
                  </button>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full h-full object-contain cursor-pointer"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onWaiting={handleWaiting}
              onPlaying={handlePlaying}
              onPause={handlePause}
              onCanPlay={handleCanPlay}
              onError={handleError}
              onEnded={() => { setShowEndScreen(true); setIsPlaying(false); }}
              onClick={togglePlay}
              poster={film.backdropUrl}
              src={film.videoUrl}
              preload="auto"
              playsInline
              autoPlay
            />

            {/* Custom Subtitles */}
            {activeSub && isPlaying && !isLoading && !hasError && (
              <div className="absolute bottom-28 left-0 w-full text-center pointer-events-none px-10 z-20">
                <span className="bg-black/80 text-white text-2xl px-6 py-2 rounded shadow-2xl backdrop-blur-md font-medium tracking-wide border border-white/10">
                  [ {activeSub} Community Captions Enabled ]
                </span>
              </div>
            )}
            
            {/* Control UI Layer */}
            <div className={`absolute inset-0 flex flex-col justify-end transition-all duration-500 z-30 ${showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              
              <div className="p-8 bg-gradient-to-t from-black/95 via-black/40 to-transparent backdrop-blur-[1px]">
                
                {/* Progress Bar */}
                <div className="relative group/progress mb-8 h-2 flex items-center cursor-pointer">
                  {/* Custom Background Track */}
                  <div className="absolute inset-x-0 h-1 bg-white/20 rounded-full pointer-events-none" />
                  
                  {/* Custom Fill Track */}
                  <div 
                    className="absolute left-0 h-1 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none transition-all z-10" 
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />

                  {/* Range Input - Transparent Track, Visible Thumb */}
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-full appearance-none bg-transparent absolute inset-0 z-20 cursor-pointer [&::-webkit-slider-runnable-track]:bg-transparent focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-10">
                    <button onClick={togglePlay} className="text-white hover:scale-110 transition-all active:scale-90 disabled:opacity-30" disabled={hasError}>
                      {isPlaying ? (
                        <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>

                    <div className="flex items-center gap-4 group/volume">
                      <button onClick={toggleMute} className="text-white hover:text-neutral-300 transition-colors">
                        {isMuted || volume === 0 ? (
                          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z"/></svg>
                        ) : (
                          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
                        )}
                      </button>
                      <input
                        type="range" min="0" max="1" step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-28 h-1 bg-white/20 rounded-full cursor-pointer accent-white"
                      />
                    </div>

                    <div className="text-sm font-mono text-neutral-400 tracking-tight">
                      <span className="text-white">{formatTime(currentTime)}</span> / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="relative">
                      <button 
                        onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                        className={`text-white p-2 rounded-full transition-all hover:bg-white/10 active:scale-90 ${showSettingsMenu ? 'rotate-90 bg-white/20' : ''}`}
                        title="Settings"
                      >
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.91,7.62,6.29L5.23,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.72,8.87 c-0.11,0.21-0.06,0.47,0.12,0.61l2.03,1.58C4.84,11.36,4.81,11.68,4.81,12c0,0.32,0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12,0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                        </svg>
                      </button>
                      
                      {showSettingsMenu && (
                        <div className="absolute bottom-full right-0 mb-6 w-64 bg-neutral-900/98 backdrop-blur-3xl border border-white/10 p-5 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 ring-1 ring-white/10">
                          <div className="mb-6">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3 px-1">Quality</h4>
                            <div className="flex flex-wrap gap-2">
                              {['Auto', '1080p', '720p', '480p'].map(q => (
                                <button 
                                  key={q}
                                  onClick={() => setQuality(q)}
                                  className={`flex-1 py-2 text-[10px] rounded-lg transition-all font-bold border ${quality === q ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-400 border-transparent hover:bg-white/10'}`}
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3 px-1">Subtitles</h4>
                            <button 
                              onClick={() => { setActiveSub(null); setShowSettingsMenu(false); }}
                              className="w-full text-left px-3 py-3 text-xs uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/5 flex justify-between items-center rounded-xl transition-colors mb-1"
                            >
                              Disabled
                              {!activeSub && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                            </button>
                            {film.subtitles.map(sub => (
                              <button 
                                key={sub.code}
                                onClick={() => { setActiveSub(sub.lang); setShowSettingsMenu(false); }}
                                className="w-full text-left px-3 py-3 text-xs uppercase tracking-widest text-white hover:bg-white/10 flex justify-between items-center rounded-xl transition-colors"
                              >
                                {sub.lang}
                                {activeSub === sub.lang && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button onClick={toggleFullscreen} className="text-white hover:scale-110 transition-transform active:scale-90">
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-black flex items-center justify-center text-center p-8 animate-in fade-in duration-700 z-50">
             <div className="max-w-xl">
                <span className="text-xs uppercase tracking-[0.5em] text-neutral-500 mb-6 block">Screening Concluded</span>
                <h3 className="text-5xl font-serif mb-8 italic text-white leading-tight">Preserving history together.</h3>
                <p className="text-neutral-400 mb-12 leading-relaxed font-light text-lg">Every frame of this film exists because viewers like you value cinematic heritage. Join our mission to keep this archive free and ad-free forever.</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/donate" className="bg-white text-black px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all transform hover:-translate-y-1 shadow-xl">Support the Mission</Link>
                  <button onClick={() => { setShowEndScreen(false); setHasError(false); if(videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play(); setIsPlaying(true); } }} className="border border-white/20 text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-neutral-900 transition-all transform hover:-translate-y-1">Watch Again</button>
                </div>
             </div>
          </div>
        )}
      </section>

      {/* Cinematic Detail Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-16">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
            <div className="flex flex-wrap items-baseline gap-6 mb-8">
              <h1 className="text-6xl md:text-8xl font-serif text-white leading-none tracking-tight">{film.title}</h1>
              <span className="text-4xl text-neutral-700 italic font-serif">{film.year}</span>
            </div>
            <p className="text-2xl text-neutral-400 font-light leading-relaxed max-w-4xl border-l-2 border-neutral-800 pl-8 italic">
              {film.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-16 border-t border-white/5 pt-20 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
             {[
               { label: 'Director', value: film.director },
               { label: 'Origin', value: film.country },
               { label: 'Duration', value: film.runtime },
               { label: 'Presentation', value: `${film.color} • ${film.sound}` },
               { label: 'Language', value: film.language },
               { label: 'Genre', value: film.genres.join(', ') }
             ].map(item => (
               <div key={item.label} className="group">
                 <span className="block text-[10px] uppercase tracking-[0.4em] text-neutral-600 mb-3 group-hover:text-neutral-400 transition-colors font-bold">{item.label}</span>
                 <span className="text-white text-xl font-light tracking-wide">{item.value}</span>
               </div>
             ))}
          </div>
        </div>

        <aside className="space-y-12 animate-in fade-in slide-in-from-right duration-1000">
          <div className="bg-neutral-900/40 p-12 border border-white/5 backdrop-blur-3xl rounded-3xl ring-1 ring-white/5">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              Verification Log
            </h4>
            <div className="space-y-10">
               <div>
                  <span className="text-[11px] uppercase text-neutral-600 block mb-2 tracking-widest font-bold">Copyright Status</span>
                  <span className="text-emerald-500 font-medium tracking-wide flex items-center gap-2">
                    Verified Public Domain
                  </span>
               </div>
               <div>
                  <span className="text-[11px] uppercase text-neutral-600 block mb-2 tracking-widest font-bold">Cloud Origin</span>
                  <p className="text-sm text-neutral-400 leading-relaxed italic font-light">{film.source}</p>
               </div>
               <div className="pt-6">
                 <Link to="/legal" className="text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-1 hover:text-white hover:border-white transition-all font-bold">
                   View Full Verification Records
                 </Link>
               </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-neutral-900/60 to-transparent p-12 border border-white/5 text-center group transition-all hover:bg-neutral-900/80 rounded-3xl ring-1 ring-white/5">
            <div className="text-5xl mb-6 grayscale opacity-40 group-hover:opacity-100 transition-all transform group-hover:scale-110">💬</div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4 tracking-[0.2em]">Community Localization</h4>
            <p className="text-sm text-neutral-500 mb-10 font-light leading-relaxed italic">"Contribute your own translations. Help us make this history accessible to everyone."</p>
            <Link to="/submit" className="inline-block border-b-2 border-white pb-1 text-xs font-bold uppercase tracking-[0.3em] hover:text-neutral-400 transition-colors">
              Submit Subtitles
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Watch;

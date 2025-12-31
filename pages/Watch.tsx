
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
  const [showMissionVideo, setShowMissionVideo] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [quality, setQuality] = useState<string>('Auto');
  
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
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
        className="relative aspect-video max-w-7xl mx-auto bg-neutral-900 overflow-hidden shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {!showMissionVideo ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-contain cursor-pointer"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setShowMissionVideo(true)}
              onClick={togglePlay}
              poster={film.thumbnailUrl}
              src={film.videoUrl}
            />

            {/* Subtitle Display Overlay */}
            {activeSub && isPlaying && (
              <div className="absolute bottom-28 left-0 w-full text-center pointer-events-none px-10 z-20">
                <span className="bg-black/70 text-white text-2xl px-6 py-2 rounded shadow-lg backdrop-blur-sm font-medium tracking-wide">
                  [ {activeSub} Subtitles Enabled ]
                </span>
              </div>
            )}
            
            {/* Custom UI Overlays */}
            <div className={`absolute inset-0 flex flex-col justify-end transition-all duration-500 z-30 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              
              {/* Bottom Control Bar */}
              <div className="p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent backdrop-blur-[2px]">
                
                {/* Progress Bar with Glow */}
                <div className="relative group/progress mb-6">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 accent-white cursor-pointer relative z-10"
                  />
                  <div 
                    className="absolute top-[9px] left-0 h-1 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] pointer-events-none" 
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-10">
                    {/* Larger Play/Pause Button */}
                    <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform active:scale-95">
                      {isPlaying ? (
                        <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center gap-4 group/volume">
                      <button onClick={toggleMute} className="text-white hover:text-neutral-300">
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
                        className="w-28 h-1 bg-white/20 rounded-full"
                      />
                    </div>

                    <div className="text-base font-mono text-neutral-300 tracking-tight">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    {/* Settings Gear Menu */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                        className={`text-white p-2 rounded-full transition-all hover:bg-white/10 active:scale-95 ${showSettingsMenu ? 'rotate-90 text-white bg-white/20' : ''}`}
                        title="Settings"
                      >
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.91,7.62,6.29L5.23,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.72,8.87 c-0.11,0.21-0.06,0.47,0.12,0.61l2.03,1.58C4.84,11.36,4.81,11.68,4.81,12c0,0.32,0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                        </svg>
                      </button>
                      
                      {showSettingsMenu && (
                        <div className="absolute bottom-full right-0 mb-6 w-64 bg-neutral-900/95 backdrop-blur-3xl border border-white/10 p-4 shadow-2xl rounded-lg overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
                          {/* Quality Section */}
                          <div className="mb-6">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3 px-2">Quality</h4>
                            <div className="flex flex-wrap gap-2">
                              {['Auto', '1080p', '720p', '480p'].map(q => (
                                <button 
                                  key={q}
                                  onClick={() => setQuality(q)}
                                  className={`flex-1 py-2 text-xs rounded transition-all font-medium ${quality === q ? 'bg-white text-black' : 'bg-white/5 text-neutral-300 hover:bg-white/10'}`}
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Subtitles Section */}
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3 px-2">Subtitles</h4>
                            <button 
                              onClick={() => { setActiveSub(null); setShowSettingsMenu(false); }}
                              className="w-full text-left px-3 py-3 text-xs uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/10 flex justify-between items-center rounded mb-1"
                            >
                              Disable
                              {!activeSub && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                            </button>
                            {film.subtitles.map(sub => (
                              <button 
                                key={sub.code}
                                onClick={() => { setActiveSub(sub.lang); setShowSettingsMenu(false); }}
                                className="w-full text-left px-3 py-3 text-xs uppercase tracking-widest text-white hover:bg-white/10 flex justify-between items-center rounded"
                              >
                                {sub.lang}
                                {activeSub === sub.lang && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button onClick={toggleFullscreen} className="text-white hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-black flex items-center justify-center text-center p-8 animate-in fade-in duration-500 z-50">
             <div className="max-w-xl">
                <span className="text-sm uppercase tracking-[0.4em] text-neutral-500 mb-6 block">Film Concluded</span>
                <h3 className="text-4xl font-serif mb-6 italic">History depends on you.</h3>
                <p className="text-neutral-400 mb-10 leading-relaxed font-light text-lg">Your support keeps this film—and thousands like it—accessible and preserved for the future. We are 100% community-funded.</p>
                <div className="flex gap-4 justify-center">
                  <Link to="/donate" className="bg-white text-black px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">Become a Patron</Link>
                  <button onClick={() => setShowMissionVideo(false)} className="border border-white/20 text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors">Replay Film</button>
                </div>
             </div>
          </div>
        )}
      </section>

      {/* Detail Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <div className="flex items-baseline gap-6 mb-10">
            <h1 className="text-6xl md:text-7xl font-serif text-white">{film.title}</h1>
            <span className="text-3xl text-neutral-600 italic font-serif">{film.year}</span>
          </div>
          <p className="text-2xl text-neutral-400 font-light leading-relaxed mb-16 max-w-3xl">{film.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 border-t border-white/10 pt-16">
             {[
               { label: 'Director', value: film.director },
               { label: 'Country', value: film.country },
               { label: 'Runtime', value: film.runtime },
               { label: 'Format', value: `${film.color} / ${film.sound}` },
               { label: 'Language', value: film.language },
               { label: 'Genre', value: film.genres.join(', ') }
             ].map(item => (
               <div key={item.label}>
                 <span className="block text-xs uppercase tracking-[0.3em] text-neutral-600 mb-2">{item.label}</span>
                 <span className="text-white text-xl font-light tracking-wide">{item.value}</span>
               </div>
             ))}
          </div>
        </div>

        <aside className="space-y-10">
          <div className="bg-neutral-900/40 p-10 border border-white/5 backdrop-blur-sm">
            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-500 mb-8">Copyright Verification</h4>
            <div className="space-y-8">
               <div>
                  <span className="text-[11px] uppercase text-neutral-600 block mb-2 tracking-widest">Public Status</span>
                  <span className="text-emerald-500 font-semibold tracking-wide">Verified Public Domain</span>
               </div>
               <div>
                  <span className="text-[11px] uppercase text-neutral-600 block mb-2 tracking-widest">Digital Source</span>
                  <p className="text-sm text-neutral-400 leading-relaxed italic">{film.source}</p>
               </div>
            </div>
            <Link to="/legal" className="mt-10 block text-center text-[10px] uppercase tracking-widest text-neutral-500 underline underline-offset-4 hover:text-white transition-colors">
              Read License Details
            </Link>
          </div>
          
          <div className="bg-neutral-900/20 p-10 border border-white/5 text-center">
            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-500 mb-6">Contribute</h4>
            <p className="text-sm text-neutral-400 mb-8 font-light italic">"Better subtitles for this film? Send us your files."</p>
            <Link to="/submit" className="inline-block border-b border-white pb-1 text-xs uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors">
              Submit Captions
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Watch;


import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FILMS, DONATION_GOALS } from '../constants';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const film = FILMS.find(f => f.id === id);
  const [showMissionVideo, setShowMissionVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!film) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-3xl font-serif mb-4">Film Not Found</h2>
          <Link to="/library" className="text-white border-b border-white pb-1 uppercase tracking-widest text-sm">Back to Library</Link>
        </div>
      </div>
    );
  }

  const handleVideoEnd = () => {
    setShowMissionVideo(true);
  };

  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Cinematic Player Section */}
      <section className="relative aspect-video max-w-7xl mx-auto bg-neutral-900 group">
        {!showMissionVideo ? (
          <video
            ref={videoRef}
            className="w-full h-full"
            controls
            onEnded={handleVideoEnd}
            poster={film.thumbnailUrl}
            src={film.videoUrl}
          >
            {film.subtitles.map(sub => (
              <track key={sub.code} label={sub.lang} kind="subtitles" srcLang={sub.code} src={sub.url} />
            ))}
          </video>
        ) : (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black animate-in fade-in duration-700">
            <div className="max-w-2xl text-center px-8">
              <span className="text-sm uppercase tracking-[0.4em] text-neutral-500 mb-6 block">Support Our Mission</span>
              <h3 className="text-4xl font-serif mb-8 leading-tight">If this film mattered to you, help us preserve the next one.</h3>
              <p className="text-neutral-400 mb-10 text-lg font-light">
                Archive Cinema is a 100% community-funded platform. 
                Your donation helps us digitize, restore, and translate the works of cinematic masters.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/donate" 
                  className="bg-white text-black px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  Donate Now
                </Link>
                <button 
                  onClick={() => setShowMissionVideo(false)}
                  className="border border-neutral-700 text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Watch Again
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <div className="flex flex-wrap items-baseline gap-4 mb-4">
              <h1 className="text-5xl font-serif text-white">{film.title}</h1>
              <span className="text-2xl text-neutral-600 font-serif italic">{film.year}</span>
            </div>
            <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-3xl">
              {film.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-12 border-t border-neutral-900">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-600 mb-2">Director</h4>
              <p className="text-white text-lg">{film.director}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-600 mb-2">Country</h4>
              <p className="text-white text-lg">{film.country}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-600 mb-2">Language</h4>
              <p className="text-white text-lg">{film.language}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-600 mb-2">Format</h4>
              <p className="text-white text-lg">{film.color} / {film.sound}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-600 mb-2">Runtime</h4>
              <p className="text-white text-lg">{film.runtime}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-600 mb-2">Genre</h4>
              <p className="text-white text-lg">{film.genres.join(', ')}</p>
            </div>
          </div>
        </div>

        <aside className="space-y-12">
          <div className="bg-neutral-900/50 p-8 border border-neutral-800">
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Legal Verification</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">License Status</span>
                <span className="text-emerald-500 font-medium">Public Domain</span>
              </div>
              <div className="flex justify-between text-sm gap-4">
                <span className="text-neutral-500">Source</span>
                <span className="text-neutral-300 text-right">{film.source}</span>
              </div>
            </div>
            <Link to="/legal" className="mt-8 block text-center text-xs text-neutral-500 underline underline-offset-4 hover:text-white transition-colors">
              Read Our Copyright Policy
            </Link>
          </div>

          <div className="bg-neutral-900/50 p-8 border border-neutral-800">
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Subtitles</h4>
            <div className="space-y-2">
              <p className="text-xs text-neutral-500 italic mb-4">"Community provided – may contain errors"</p>
              {film.subtitles.length > 0 ? (
                film.subtitles.map(sub => (
                  <div key={sub.code} className="flex justify-between items-center py-2 border-b border-neutral-800 last:border-0">
                    <span className="text-sm text-neutral-300">{sub.lang}</span>
                    <button className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white">Select</button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-600">No community subtitles yet.</p>
              )}
              <Link to="/submit" className="mt-6 inline-block text-[10px] uppercase tracking-widest text-white border-b border-white pb-0.5">
                Contribute Subtitles
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Watch;


import React from 'react';
import { Link } from 'react-router-dom';
import { FILMS, DONATION_GOALS, MISSION_STATEMENT } from '../constants';
import FilmCard from '../components/FilmCard';

const Home: React.FC = () => {
  const featuredFilms = FILMS.slice(0, 6);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero-archive/1920/1080?grayscale" 
            className="w-full h-full object-cover opacity-20"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4 animate-in fade-in zoom-in duration-1000">
          <span className="text-sm uppercase tracking-[0.4em] text-neutral-500 mb-6 block">Non-Profit Cultural Archive</span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">
            Preserving Cinema. <br/><span className="italic font-light">Free Forever.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            The world's greatest films deserve to be seen, not forgotten. 
            Join our mission to keep cinematic history accessible to all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/library" 
              className="bg-white text-black px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Explore the Archive
            </Link>
            <Link 
              to="/donate" 
              className="border border-neutral-700 text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Support the Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif mb-8">Why it Matters</h2>
        <div className="space-y-6 text-xl text-neutral-400 font-light leading-relaxed">
          <p>{MISSION_STATEMENT}</p>
          <p>
            Public domain cinema is disappearing due to neglect. 
            By hosting these works without paywalls or advertisements, 
            we ensure that future generations can learn from and enjoy the pioneers of the screen.
          </p>
        </div>
      </section>

      {/* Featured Films */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif mb-2 text-white">Featured Archive</h2>
            <p className="text-neutral-500 uppercase tracking-widest text-xs">Curated historical highlights</p>
          </div>
          <Link to="/library" className="text-sm text-neutral-400 hover:text-white uppercase tracking-widest transition-colors border-b border-neutral-800 pb-1">
            View Full Library
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {featuredFilms.map(film => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      </section>

      {/* Transparency / Goals Section */}
      <section className="max-w-5xl mx-auto px-4 py-24 bg-neutral-900/30 rounded-lg border border-neutral-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Radical Transparency</h2>
          <p className="text-neutral-500 uppercase tracking-[0.2em] text-xs">Our current community funding goals</p>
        </div>
        
        <div className="grid gap-12 max-w-3xl mx-auto">
          {DONATION_GOALS.map(goal => {
            const percentage = Math.round((goal.current / goal.target) * 100);
            return (
              <div key={goal.id} className="group">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <h3 className="text-lg font-medium text-white">{goal.title}</h3>
                  </div>
                  <span className="text-neutral-400 font-mono text-sm">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                </div>
                <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-1000 ease-out group-hover:bg-neutral-300" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-right text-xs text-neutral-600 uppercase tracking-widest">{percentage}% Complete</p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <Link to="/donate" className="inline-block border-b-2 border-white pb-2 text-xl font-serif hover:text-neutral-400 transition-colors">
            Help us reach these goals →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;


import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-serif mb-8 italic">The Archive Project</h1>
        <p className="text-sm uppercase tracking-[0.5em] text-neutral-500">Established for the Preservation of Human Culture</p>
      </div>

      <div className="space-y-24 text-xl text-neutral-400 font-light leading-relaxed">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif text-white mb-6">Why Old Films Matter</h2>
            <p>
              Cinema is the memory of the 20th century. Every frame of a silent classic or an experimental documentary 
              captures the dreams, fears, and visual language of a bygone era. When we lose these films, we lose 
              a piece of our collective identity.
            </p>
          </div>
          <div className="aspect-square bg-neutral-900 flex items-center justify-center border border-neutral-800">
             <span className="text-6xl grayscale opacity-30">🎞️</span>
          </div>
        </section>

        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif text-white mb-6">The Ad-Free Pledge</h2>
          <p>
            We believe that cultural heritage should not be interrupted by advertisements or gated by paywalls. 
            Archive Cinema is a "pure" platform—no clutter, no trackers, no algorithms. Just the film.
          </p>
        </section>

        <section className="bg-neutral-900/30 p-12 border border-neutral-800">
          <h2 className="text-3xl font-serif text-white mb-8 text-center">Donation-Based Sustainability</h2>
          <div className="space-y-6 text-lg">
            <p>
              Maintaining a global streaming infrastructure is expensive. Storage, bandwidth, and curation require resources. 
              Instead of selling your data, we ask for your support. 
            </p>
            <p className="font-serif italic text-2xl text-white">
              "This project started with no money, only love for cinema."
            </p>
            <p>
              We are a non-profit initiative. Every dollar donated goes directly into the servers, subtitle expansion, 
              and legal research needed to bring more films into the light.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-serif text-white mb-8">Future Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Mobile Apps", desc: "Offline viewing for iOS & Android" },
              { title: "Restoration", desc: "4K AI-assisted cleaning of originals" },
              { title: "Education", desc: "Expert essays & scholarly context" },
            ].map(item => (
              <div key={item.title} className="p-6 border border-neutral-800 bg-black">
                <h4 className="text-white font-medium mb-2">{item.title}</h4>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col items-center gap-8 pt-12 border-t border-neutral-900">
          <p className="text-center italic">Join us in rescuing the world's cinematic past.</p>
          <div className="flex gap-6">
            <Link to="/library" className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest">Browse Archive</Link>
            <Link to="/donate" className="border border-neutral-700 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800">Donate</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

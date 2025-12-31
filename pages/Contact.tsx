
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-serif mb-12">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Inquiries</h4>
            <p className="text-xl text-neutral-300 font-light">hello@archivecinema.org</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Legal & Copyright</h4>
            <p className="text-xl text-neutral-300 font-light">legal@archivecinema.org</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Press</h4>
            <p className="text-xl text-neutral-300 font-light">media@archivecinema.org</p>
          </div>
          <div className="pt-8 border-t border-neutral-900">
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Follow</h4>
            <div className="flex gap-6 text-sm text-neutral-400">
              <a href="#" className="hover:text-white underline underline-offset-4">Letterboxd</a>
              <a href="#" className="hover:text-white underline underline-offset-4">Mastodon</a>
              <a href="#" className="hover:text-white underline underline-offset-4">RSS Feed</a>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/30 p-8 border border-neutral-800 space-y-6">
          <h3 className="text-lg font-serif mb-4">Message the Archivist</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Name" className="w-full bg-black border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600" />
            <input type="email" placeholder="Email" className="w-full bg-black border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600" />
            <textarea placeholder="Your message..." rows={4} className="w-full bg-black border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600 resize-none"></textarea>
            <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

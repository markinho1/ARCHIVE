
import React, { useState } from 'react';

const Submit: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-center">
        <div className="max-w-md px-4">
          <h2 className="text-3xl font-serif mb-4">Submission Received</h2>
          <p className="text-neutral-500 mb-8 leading-relaxed">
            Thank you for contributing to the archive. Our moderators will review the legal status 
            and quality of your submission within 7-10 business days.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-white border-b border-white pb-1 uppercase tracking-widest text-sm"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h1 className="text-5xl font-serif mb-6">Contribute</h1>
        <p className="text-xl text-neutral-400 font-light leading-relaxed">
          Help us expand the library. We welcome suggestions for public domain films, 
          community-made subtitles, historical or fan-made dubbings, and copyright verification information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-600">Your Name</label>
              <input type="text" className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-neutral-600" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-600">Email Address</label>
              <input type="email" className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-neutral-600" required />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Contribution Type</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {['Film Suggestion', 'Subtitle File', 'Historical or Fan-made Dubbing', 'Public Domain Proof', 'Correction'].map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="contributionType" className="accent-white h-4 w-4" required />
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Details</h3>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-600">Film Title (if applicable)</label>
            <input type="text" className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-neutral-600" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-600">Description / Links / Verification</label>
            <textarea 
              rows={6}
              placeholder="Provide source links, subtitle text, historical or fan-made dub sources, or copyright verification proof..."
              className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-neutral-600 resize-none"
              required
            ></textarea>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-white text-black py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors"
          >
            Submit Contribution
          </button>
        </div>

        <p className="text-xs text-neutral-600 text-center italic">
          * By submitting, you affirm that your contribution is for educational purposes and does not violate any third-party copyrights in the jurisdiction of origin.
        </p>
      </form>
    </div>
  );
};

export default Submit;

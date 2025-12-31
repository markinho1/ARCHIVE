
import React from 'react';

const Legal: React.FC = () => {
  return (
    <div className="pt-32 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-serif mb-12">Legal & Public Domain</h1>
      
      <div className="space-y-12 text-neutral-400 leading-relaxed font-light text-lg">
        <section className="bg-neutral-900/50 p-8 border border-neutral-800 border-l-4 border-l-white">
          <h2 className="text-white text-xl font-semibold mb-4 uppercase tracking-widest">Copyright Disclaimer</h2>
          <p className="italic">
            “All films hosted on this platform are believed to be in the public domain. 
            If you believe any content infringes copyright, please contact us for immediate review.”
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-serif mb-6">Our Verification Process</h2>
          <p className="mb-6">
            We take public domain verification seriously. Before any film is added to the Archive Cinema library, 
            it undergoes a review process. We rely on the following primary sources:
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li><strong className="text-neutral-300">Expired Copyright:</strong> Films where the original term of copyright has lapsed.</li>
            <li><strong className="text-neutral-300">Lapsed Formalities:</strong> Films published in the US before 1978 without a valid copyright notice.</li>
            <li><strong className="text-neutral-300">Government Works:</strong> Films produced by governmental entities that are inherently public.</li>
            <li><strong className="text-neutral-300">Trusted Repositories:</strong> Verification provided by the Internet Archive and national film institutes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-2xl font-serif mb-6">Takedown Policy</h2>
          <p>
            Archive Cinema respects intellectual property. If you are the owner of a copyright that you believe 
            has been incorrectly identified as public domain, please email us at <span className="text-white">legal@archivecinema.org</span>. 
            Include the film title, proof of ownership, and the specific jurisdiction of the claim. 
            We will respond and remove the content immediately pending full investigation.
          </p>
        </section>

        <section className="pt-12 border-t border-neutral-900">
          <p className="text-xs text-neutral-600 uppercase tracking-widest">
            Last Updated: February 2024
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;

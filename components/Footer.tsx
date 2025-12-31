
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-neutral-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-serif mb-6">Archive Cinema</h3>
            <p className="text-neutral-500 max-w-sm leading-relaxed mb-6">
              A non-profit cultural initiative dedicated to the preservation and free distribution of public domain films. 
              Built with love for the seventh art.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">Navigation</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><Link to="/library" className="hover:text-white transition-colors">Film Library</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/donate" className="hover:text-white transition-colors">Donate</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">Legal</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><Link to="/legal" className="hover:text-white transition-colors">Copyright Policy</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 space-y-4 md:space-y-0 text-center md:text-left">
          <p>© {new Date().getFullYear()} Archive Cinema. All rights believed to be in public domain.</p>
          <p>“Preserving Cinema. Free Forever.”</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-neutral-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-serif mb-6">Lume Cinema</h3>
            <p className="text-neutral-500 max-w-sm leading-relaxed mb-6">
              Uma iniciativa cultural sem fins lucrativos dedicada à preservação e distribuição gratuita de filmes de domínio público. 
              Feito com amor pela sétima arte.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">Navegação</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><Link to="/library" className="hover:text-white transition-colors">Acervo de Filmes</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Nossa Missão</Link></li>
              <li><Link to="/donate" className="hover:text-white transition-colors">Doar</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">Legal</h4>
            <ul className="space-y-4 text-neutral-500">
              <li><Link to="/legal" className="hover:text-white transition-colors">Política de Direitos Autorais</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 space-y-4 md:space-y-0 text-center md:text-left">
          <p>© {new Date().getFullYear()} Lume Cinema. Todos os direitos considerados de domínio público.</p>
          <p>“Preservando o Cinema. Grátis para Sempre.”</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
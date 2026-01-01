import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-serif mb-12">Fale Conosco</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Consultas</h4>
            <p className="text-xl text-neutral-300 font-light">hello@lumecinema.org</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Legal e Direitos Autorais</h4>
            <p className="text-xl text-neutral-300 font-light">legal@lumecinema.org</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Imprensa</h4>
            <p className="text-xl text-neutral-300 font-light">media@lumecinema.org</p>
          </div>
          <div className="pt-8 border-t border-neutral-900">
            <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Siga-nos</h4>
            <div className="flex gap-6 text-sm text-neutral-400">
              <a href="#" className="hover:text-white underline underline-offset-4">Letterboxd</a>
              <a href="#" className="hover:text-white underline underline-offset-4">Mastodon</a>
              <a href="#" className="hover:text-white underline underline-offset-4">RSS Feed</a>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/30 p-8 border border-neutral-800 space-y-6">
          <h3 className="text-lg font-serif mb-4">Mensagem para o Arquivista</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Nome" className="w-full bg-black border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600" />
            <input type="email" placeholder="E-mail" className="w-full bg-black border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600" />
            <textarea placeholder="Sua mensagem..." rows={4} className="w-full bg-black border border-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600 resize-none"></textarea>
            <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest">Enviar Mensagem</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
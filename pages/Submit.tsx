
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
          <h2 className="text-3xl font-serif mb-4">Envio Recebido</h2>
          <p className="text-neutral-500 mb-8 leading-relaxed">
            Obrigado por contribuir para o acervo. Nossos moderadores revisarão o status legal 
            e a qualidade do seu envio dentro de 7 a 10 dias úteis.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-white border-b border-white pb-1 uppercase tracking-widest text-sm"
          >
            Enviar Outro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h1 className="text-5xl font-serif mb-6">Contribua</h1>
        <p className="text-xl text-neutral-400 font-light leading-relaxed">
          Ajude-nos a expandir o acervo. Agradecemos sugestões de filmes de domínio público, 
          legendas feitas pela comunidade, dublagens históricas ou feitas por fãs e informações de verificação de direitos autorais.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Informações Básicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-600">Seu Nome</label>
              <input type="text" className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-neutral-600" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-600">Endereço de E-mail</label>
              <input type="email" className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-neutral-600" required />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Tipo de Contribuição</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {['Sugestão de Filme', 'Arquivo de Legenda', 'Dublagem Histórica ou de Fã', 'Prova de Domínio Público', 'Correção'].map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="contributionType" className="accent-white h-4 w-4" required />
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Detalhes</h3>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-600">Título do Filme (se aplicável)</label>
            <input type="text" className="w-full bg-black border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-neutral-600" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-600">Descrição / Links / Verificação</label>
            <textarea 
              rows={6}
              placeholder="Forneça links de origem, texto de legenda, fontes de dublagem ou prova de verificação de direitos autorais..."
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
            Enviar Contribuição
          </button>
        </div>

        <p className="text-xs text-neutral-600 text-center italic">
          * Ao enviar, você afirma que sua contribuição é para fins educacionais e não viola quaisquer direitos autorais de terceiros na jurisdição de origem.
        </p>
      </form>
    </div>
  );
};

export default Submit;

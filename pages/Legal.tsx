import React from 'react';

const Legal: React.FC = () => {
  return (
    <div className="pt-32 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-serif mb-12">Legal e Domínio Público</h1>
      
      <div className="space-y-12 text-neutral-400 leading-relaxed font-light text-lg">
        <section className="bg-neutral-900/50 p-8 border border-neutral-800 border-l-4 border-l-white">
          <h2 className="text-white text-xl font-semibold mb-4 uppercase tracking-widest">Aviso de Direitos Autorais</h2>
          <p className="italic">
            “Todos os filmes hospedados nesta plataforma são considerados de domínio público. 
            Se você acredita que algum conteúdo infringe direitos autorais, entre em contato conosco para revisão imediata.”
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-serif mb-6">Nosso Processo de Verificação</h2>
          <p className="mb-6">
            Levamos a sério a verificação de domínio público. Antes que qualquer filme seja adicionado ao acervo do Lume Cinema, 
            ele passa por um processo de revisão. Confiamos nas seguintes fontes primárias:
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li><strong className="text-neutral-300">Direitos Autorais Expirados:</strong> Filmes onde o prazo original de direitos autorais expirou.</li>
            <li><strong className="text-neutral-300">Formalidades Caducadas:</strong> Filmes publicados nos EUA antes de 1978 sem um aviso de direitos autorais válido.</li>
            <li><strong className="text-neutral-300">Obras Governamentais:</strong> Filmes produzidos por entidades governamentais que são inerentemente públicos.</li>
            <li><strong className="text-neutral-300">Repositórios Confiáveis:</strong> Verificação fornecida pelo Internet Archive e institutos nacionais de cinema.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-2xl font-serif mb-6">Política de Remoção</h2>
          <p>
            O Lume Cinema respeita a propriedade intelectual. Se você for o proprietário de um direito autoral que acredita 
            ter sido incorretamente identificado como domínio público, envie um e-mail para <span className="text-white">legal@lumecinema.org</span>. 
            Inclua o título do filme, prova de propriedade e a jurisdição específica da reivindação. 
            Responderemos e removeremos o conteúdo imediatamente, aguardando investigação completa.
          </p>
        </section>

        <section className="pt-12 border-t border-neutral-900">
          <p className="text-xs text-neutral-600 uppercase tracking-widest">
            Última Atualização: Fevereiro de 2024
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
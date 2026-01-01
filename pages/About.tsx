import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-serif mb-8 italic">O Projeto Lume</h1>
        <p className="text-sm uppercase tracking-[0.5em] text-neutral-500">Estabelecido para a Preservação da Cultura Humana</p>
      </div>

      <div className="space-y-24 text-xl text-neutral-400 font-light leading-relaxed">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif text-white mb-6">Por que Filmes Antigos Importam</h2>
            <p>
              O cinema é a memória do século XX. Cada quadro de um clássico mudo ou um documentário experimental 
              captura os sonhos, medos e a linguagem visual de uma era passada. Quando perdemos esses filmes, perdemos 
              um pedaço da nossa identidade coletiva.
            </p>
          </div>
          <div className="aspect-square bg-neutral-900 flex items-center justify-center border border-neutral-800">
             <span className="text-6xl grayscale opacity-30">🎞️</span>
          </div>
        </section>

        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif text-white mb-6">O Compromisso Sem Anúncios</h2>
          <p>
            Acreditamos que o patrimônio cultural não deve ser interrompido por anúncios ou bloqueado por paywalls. 
            O Lume Cinema é uma plataforma "pura" — sem desordem, sem rastreadores, sem algoritmos. Apenas o filme.
          </p>
        </section>

        <section className="bg-neutral-900/30 p-12 border border-neutral-800">
          <h2 className="text-3xl font-serif text-white mb-8 text-center">Sustentabilidade Baseada em Doações</h2>
          <div className="space-y-6 text-lg">
            <p>
              Manter uma infraestrutura global de streaming é caro. Armazenamento, largura de banda e curadoria exigem recursos. 
              Em vez de vender seus dados, pedimos o seu apoio. 
            </p>
            <p className="font-serif italic text-2xl text-white">
              "Este projeto começou sem dinheiro, apenas com amor pelo cinema."
            </p>
            <p>
              Somos uma iniciativa sem fins lucrativos. Cada dólar doado vai diretamente para os servidores, expansão de legendas 
              e pesquisa jurídica necessária para trazer mais filmes à luz.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-serif text-white mb-8">Roteiro Futuro</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Apps Móveis", desc: "Visualização offline para iOS e Android" },
              { title: "Restauração", desc: "Limpeza assistida por IA em 4K de originais" },
              { title: "Educação", desc: "Ensaios de especialistas e contexto acadêmico" },
            ].map(item => (
              <div key={item.title} className="p-6 border border-neutral-800 bg-black">
                <h4 className="text-white font-medium mb-2">{item.title}</h4>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col items-center gap-8 pt-12 border-t border-neutral-900">
          <p className="text-center italic">Junte-se a nós para resgatar o passado cinematográfico do mundo.</p>
          <div className="flex gap-6">
            <Link to="/library" className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest">Navegar no Acervo</Link>
            <Link to="/donate" className="border border-neutral-700 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800">Doar</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
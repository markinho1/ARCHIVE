
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DONATION_GOALS, MISSION_STATEMENT } from '../constants';
import { fetchFilms } from '../services/wordpress';
import { Film } from '../types';
import FilmCard from '../components/FilmCard';

const Home: React.FC = () => {
  const [featuredFilms, setFeaturedFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const films = await fetchFilms();
      // Slice the first 6 films for the homepage
      setFeaturedFilms(films.slice(0, 6));
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero-archive/1920/1080?grayscale" 
            className="w-full h-full object-cover opacity-20"
            alt="Fundo"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4 animate-in fade-in zoom-in duration-1000">
          <span className="text-sm uppercase tracking-[0.4em] text-neutral-500 mb-6 block">Arquivo Cultural Sem Fins Lucrativos</span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">
            Preservando o Cinema. <br/><span className="italic font-light">Grátis para Sempre.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Os grandes filmes do mundo merecem ser vistos, não esquecidos. 
            Junte-se à nossa missão de manter a história do cinema acessível a todos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/library" 
              className="bg-white text-black px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Explorar o Acervo
            </Link>
            <Link 
              to="/donate" 
              className="border border-neutral-700 text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Apoie a Missão
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif mb-8">Por que isso importa</h2>
        <div className="space-y-6 text-xl text-neutral-400 font-light leading-relaxed">
          <p>{MISSION_STATEMENT}</p>
          <p>
            O cinema de domínio público está desaparecendo devido à negligência. 
            Ao hospedar essas obras sem paywalls ou propagandas, 
            garantimos que as futuras gerações possam aprender e desfrutar dos pioneiros da tela.
          </p>
        </div>
      </section>

      {/* Featured Films */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif mb-2 text-white">Destaques do Arquivo</h2>
            <p className="text-neutral-500 uppercase tracking-widest text-xs">Destaques históricos curados</p>
          </div>
          <Link to="/library" className="text-sm text-neutral-400 hover:text-white uppercase tracking-widest transition-colors border-b border-neutral-800 pb-1">
            Ver Acervo Completo
          </Link>
        </div>
        
        {loading ? (
           <div className="flex justify-center py-20">
             <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {featuredFilms.map(film => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        )}
      </section>

      {/* Transparency / Goals Section */}
      <section className="max-w-5xl mx-auto px-4 py-24 bg-neutral-900/30 rounded-lg border border-neutral-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Transparência Radical</h2>
          <p className="text-neutral-500 uppercase tracking-[0.2em] text-xs">Nossas metas atuais de financiamento comunitário</p>
        </div>
        
        <div className="grid gap-12 max-w-3xl mx-auto">
          {DONATION_GOALS.map(goal => {
            const percentage = Math.round((goal.current / goal.target) * 100);
            return (
              <div key={goal.id} className="group">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <h3 className="text-lg font-medium text-white">{goal.title}</h3>
                  </div>
                  <span className="text-neutral-400 font-mono text-sm">R$ {goal.current.toLocaleString('pt-BR')} / R$ {goal.target.toLocaleString('pt-BR')}</span>
                </div>
                <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-1000 ease-out group-hover:bg-neutral-300" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-right text-xs text-neutral-600 uppercase tracking-widest">{percentage}% Concluído</p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <Link to="/donate" className="inline-block border-b-2 border-white pb-2 text-xl font-serif hover:text-neutral-400 transition-colors">
            Ajude-nos a alcançar essas metas →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

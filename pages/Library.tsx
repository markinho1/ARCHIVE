
import React, { useState, useMemo, useEffect } from 'react';
import { fetchFilms } from '../services/wordpress';
import { Film, SortOption } from '../types';
import FilmCard from '../components/FilmCard';

const Library: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [yearRange, setYearRange] = useState<[number, number]>([1895, 1970]);
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [selectedCountry, setSelectedCountry] = useState<string>('Todos');
  const [selectedFormat, setSelectedFormat] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Fetch films on mount
  useEffect(() => {
    const loadFilms = async () => {
      setLoading(true);
      const data = await fetchFilms();
      setFilms(data);
      setLoading(false);
    };
    loadFilms();
  }, []);

  const genres = useMemo(() => ['Todos', ...Array.from(new Set(films.flatMap(f => f.genres)))], [films]);
  const countries = useMemo(() => ['Todos', ...Array.from(new Set(films.map(f => f.country)))], [films]);
  const formats = ['Todos', 'Mudo', 'Som', 'Preto & Branco', 'Cor'];

  const filteredFilms = useMemo(() => {
    let result = films.filter(film => {
      const matchesSearch = film.title.toLowerCase().includes(search.toLowerCase()) || 
                           film.director.toLowerCase().includes(search.toLowerCase());
      const matchesYear = film.year >= yearRange[0] && film.year <= yearRange[1];
      const matchesGenre = selectedGenre === 'Todos' || film.genres.includes(selectedGenre);
      const matchesCountry = selectedCountry === 'Todos' || film.country === selectedCountry;
      
      let matchesFormat = true;
      if (selectedFormat === 'Mudo') matchesFormat = film.sound === 'Mudo';
      else if (selectedFormat === 'Som') matchesFormat = film.sound === 'Som';
      else if (selectedFormat === 'Preto & Branco') matchesFormat = film.color === 'Preto & Branco';
      else if (selectedFormat === 'Cor') matchesFormat = film.color === 'Cor';

      return matchesSearch && matchesYear && matchesGenre && matchesCountry && matchesFormat;
    });

    result.sort((a, b) => {
      if (sortBy === 'oldest') return a.year - b.year;
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'runtime') return parseInt(b.runtime) - parseInt(a.runtime);
      return 0;
    });

    return result;
  }, [films, search, yearRange, selectedGenre, selectedCountry, selectedFormat, sortBy]);

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h1 className="text-5xl font-serif mb-4">Acervo de Filmes</h1>
        <p className="text-neutral-500 uppercase tracking-widest text-sm">
          {loading ? 'Sincronizando com a nuvem...' : `Descubra ${filteredFilms.length} obras-primas da história`}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-neutral-900/50 p-8 rounded-sm border border-neutral-800 mb-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">Pesquisar no Acervo</label>
            <input 
              type="text" 
              placeholder="Título, Diretor..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-neutral-800 px-4 py-2 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">Gênero</label>
            <select 
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-black border border-neutral-800 px-4 py-2 text-white focus:outline-none focus:border-neutral-600 appearance-none"
              disabled={loading}
            >
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">País</label>
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-black border border-neutral-800 px-4 py-2 text-white focus:outline-none focus:border-neutral-600 appearance-none"
              disabled={loading}
            >
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">Ordenar Por</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full bg-black border border-neutral-800 px-4 py-2 text-white focus:outline-none focus:border-neutral-600 appearance-none"
            >
              <option value="newest">Adicionados Recentemente</option>
              <option value="oldest">Mais Antigos</option>
              <option value="alphabetical">A-Z</option>
              <option value="runtime">Maior Duração</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-4 mr-8">
            <label className="text-xs uppercase tracking-widest text-neutral-500 whitespace-nowrap">Ano: {yearRange[0]} - {yearRange[1]}</label>
            <input 
              type="range" min="1895" max="1970" 
              value={yearRange[1]}
              onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
              className="w-48 accent-white"
            />
          </div>
          
          <div className="flex gap-2">
            {formats.map(f => (
              <button
                key={f}
                onClick={() => setSelectedFormat(f)}
                className={`text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                  selectedFormat === f 
                  ? 'bg-white text-black border-white' 
                  : 'text-neutral-500 border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 opacity-50">
            <div className="w-12 h-12 border-2 border-neutral-700 border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-xs uppercase tracking-widest">Carregando Acervo...</p>
        </div>
      ) : filteredFilms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredFilms.map(film => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 border border-dashed border-neutral-800 rounded-lg">
          <p className="text-neutral-500 font-serif text-2xl italic">Nenhum filme corresponde aos seus critérios atuais.</p>
          <button 
            onClick={() => {
              setSearch('');
              setYearRange([1895, 1970]);
              setSelectedGenre('Todos');
              setSelectedCountry('Todos');
              setSelectedFormat('Todos');
            }}
            className="mt-6 text-sm text-white border-b border-white pb-1 uppercase tracking-widest"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;

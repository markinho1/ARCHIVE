
import React, { useState, useMemo } from 'react';
import { FILMS } from '../constants';
import { Film, SortOption } from '../types';
import FilmCard from '../components/FilmCard';

const Library: React.FC = () => {
  const [search, setSearch] = useState('');
  const [yearRange, setYearRange] = useState<[number, number]>([1895, 1970]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const genres = ['All', ...Array.from(new Set(FILMS.flatMap(f => f.genres)))];
  const countries = ['All', ...Array.from(new Set(FILMS.map(f => f.country)))];
  const formats = ['All', 'Silent', 'Sound', 'B&W', 'Color'];

  const filteredFilms = useMemo(() => {
    let result = FILMS.filter(film => {
      const matchesSearch = film.title.toLowerCase().includes(search.toLowerCase()) || 
                           film.director.toLowerCase().includes(search.toLowerCase());
      const matchesYear = film.year >= yearRange[0] && film.year <= yearRange[1];
      const matchesGenre = selectedGenre === 'All' || film.genres.includes(selectedGenre);
      const matchesCountry = selectedCountry === 'All' || film.country === selectedCountry;
      
      let matchesFormat = true;
      if (selectedFormat === 'Silent') matchesFormat = film.sound === 'Silent';
      else if (selectedFormat === 'Sound') matchesFormat = film.sound === 'Sound';
      else if (selectedFormat === 'B&W') matchesFormat = film.color === 'B&W';
      else if (selectedFormat === 'Color') matchesFormat = film.color === 'Color';

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
  }, [search, yearRange, selectedGenre, selectedCountry, selectedFormat, sortBy]);

  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h1 className="text-5xl font-serif mb-4">Film Archive</h1>
        <p className="text-neutral-500 uppercase tracking-widest text-sm">Discover {filteredFilms.length} masterpieces of history</p>
      </div>

      {/* Filters */}
      <div className="bg-neutral-900/50 p-8 rounded-sm border border-neutral-800 mb-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">Search Archive</label>
            <input 
              type="text" 
              placeholder="Title, Director..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-neutral-800 px-4 py-2 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">Genre</label>
            <select 
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-black border border-neutral-800 px-4 py-2 text-white focus:outline-none focus:border-neutral-600 appearance-none"
            >
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">Country</label>
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-black border border-neutral-800 px-4 py-2 text-white focus:outline-none focus:border-neutral-600 appearance-none"
            >
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-neutral-500">Sort By</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full bg-black border border-neutral-800 px-4 py-2 text-white focus:outline-none focus:border-neutral-600 appearance-none"
            >
              <option value="newest">Latest Added</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">A-Z</option>
              <option value="runtime">Longest Runtime</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-4 mr-8">
            <label className="text-xs uppercase tracking-widest text-neutral-500 whitespace-nowrap">Year Range: {yearRange[0]} - {yearRange[1]}</label>
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
      {filteredFilms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredFilms.map(film => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 border border-dashed border-neutral-800 rounded-lg">
          <p className="text-neutral-500 font-serif text-2xl italic">No films match your current criteria.</p>
          <button 
            onClick={() => {
              setSearch('');
              setYearRange([1895, 1970]);
              setSelectedGenre('All');
              setSelectedCountry('All');
              setSelectedFormat('All');
            }}
            className="mt-6 text-sm text-white border-b border-white pb-1 uppercase tracking-widest"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;

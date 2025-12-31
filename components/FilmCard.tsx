
import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../types';

interface Props {
  film: Film;
}

const FilmCard: React.FC<Props> = ({ film }) => {
  return (
    <Link to={`/watch/${film.id}`} className="group relative block film-card-hover overflow-hidden rounded-sm">
      <div className="aspect-[2/3] w-full overflow-hidden bg-neutral-900">
        <img
          src={film.thumbnailUrl}
          alt={film.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-white font-serif text-xl mb-1">{film.title}</p>
          <div className="flex gap-2 text-xs text-neutral-300 font-medium">
            <span>{film.year}</span>
            <span>•</span>
            <span>{film.country}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-base font-medium text-neutral-200 group-hover:text-white transition-colors line-clamp-1">
            {film.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-500">{film.director}</p>
        </div>
        <span className="text-[10px] uppercase tracking-tighter border border-neutral-700 px-1.5 py-0.5 text-neutral-500 group-hover:border-neutral-500 transition-colors">
          {film.runtime}
        </span>
      </div>
    </Link>
  );
};

export default FilmCard;

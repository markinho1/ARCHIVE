
import { Film } from '../types';
import { WORDPRESS_API_URL, FILMS as STATIC_FILMS } from '../constants';

// Interface for standard WordPress REST API Response
interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    director?: string;
    year?: string;
    country?: string;
    runtime?: string;
    genres?: string | string[]; // Can be comma separated or array
    type?: string;
    color?: string;
    sound?: string;
    source?: string;
    video_url?: string;
    poster_url?: string;
    backdrop_url?: string;
    language?: string;
  };
}

// Transform WP Data to App Data
const mapPostToFilm = (post: WPPost): Film => {
  const acf = post.acf || {};
  
  // Handle genres which might be array or string
  let genres: string[] = ['Clássico'];
  if (Array.isArray(acf.genres)) {
    genres = acf.genres;
  } else if (typeof acf.genres === 'string') {
    genres = acf.genres.split(',').map(g => g.trim());
  }

  return {
    id: post.slug, // Using slug as ID for cleaner URLs
    title: post.title.rendered,
    year: parseInt(acf.year || '0'),
    director: acf.director || 'Desconhecido',
    country: acf.country || 'Mundial',
    runtime: acf.runtime || 'N/A',
    genres: genres,
    type: (acf.type as any) || 'Narrativa',
    color: (acf.color as any) || 'Preto & Branco',
    sound: (acf.sound as any) || 'Som',
    source: acf.source || 'Arquivo Digital',
    videoUrl: acf.video_url || '',
    posterUrl: acf.poster_url || 'https://via.placeholder.com/400x600?text=Sem+Cartaz',
    backdropUrl: acf.backdrop_url || 'https://via.placeholder.com/1920x1080?text=Cinema',
    description: post.content.rendered.replace(/<[^>]*>?/gm, ''), // Strip HTML tags
    language: acf.language || 'Mudo',
    subtitles: [] // Subtitles would require a more complex repeater field mapping
  };
};

export const fetchFilms = async (): Promise<Film[]> => {
  try {
    // Check if URL is configured (not the demo one or empty)
    if (!WORDPRESS_API_URL || WORDPRESS_API_URL.includes('demo.wp-api')) {
       console.warn('Usando dados estáticos. Configure WORDPRESS_API_URL em constants.ts');
       return STATIC_FILMS;
    }

    const response = await fetch(`${WORDPRESS_API_URL}/posts?per_page=100`);
    
    if (!response.ok) {
      throw new Error('Falha na conexão com WordPress');
    }

    const posts: WPPost[] = await response.json();
    
    // If no posts found or API structure mismatch, fallback
    if (!posts || posts.length === 0) return STATIC_FILMS;

    return posts.map(mapPostToFilm);
  } catch (error) {
    console.error('Erro ao buscar filmes do WordPress:', error);
    // Fallback to static data so the app doesn't crash
    return STATIC_FILMS;
  }
};

export const fetchFilmBySlug = async (slug: string): Promise<Film | undefined> => {
    try {
        const allFilms = await fetchFilms();
        return allFilms.find(f => f.id === slug);
    } catch (e) {
        return STATIC_FILMS.find(f => f.id === slug);
    }
}

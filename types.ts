
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'subscriber';
  avatar?: string;
  joinedAt: string;
}

export interface Film {
  id: string;
  title: string;
  year: number;
  director: string;
  country: string;
  runtime: string;
  genres: string[];
  type: 'Narrativa' | 'Documentário' | 'Experimental';
  color: 'Preto & Branco' | 'Cor';
  sound: 'Mudo' | 'Som';
  source: string;
  videoUrl: string;
  posterUrl: string;   // Vertical (2:3) for Library
  backdropUrl: string; // Horizontal (16:9) for Player/Hero
  description: string;
  language: string;
  subtitles: { lang: string; url: string; code: string }[];
  isRestricted?: boolean; // New: If true, requires login/membership
}

export interface DonationGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  icon: string;
}

export type SortOption = 'oldest' | 'newest' | 'alphabetical' | 'runtime';

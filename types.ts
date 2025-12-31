
export interface Film {
  id: string;
  title: string;
  year: number;
  director: string;
  country: string;
  runtime: string;
  genres: string[];
  type: 'Narrative' | 'Documentary' | 'Experimental';
  color: 'B&W' | 'Color';
  sound: 'Silent' | 'Sound';
  source: string;
  videoUrl: string;
  posterUrl: string;   // Vertical (2:3) for Library
  backdropUrl: string; // Horizontal (16:9) for Player/Hero
  description: string;
  language: string;
  subtitles: { lang: string; url: string; code: string }[];
}

export interface DonationGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  icon: string;
}

export type SortOption = 'oldest' | 'newest' | 'alphabetical' | 'runtime';

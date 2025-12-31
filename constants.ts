
import { Film, DonationGoal } from './types';

export const FILMS: Film[] = [
  {
    id: 'night-living-dead-1968',
    title: 'Night of the Living Dead',
    year: 1968,
    director: 'George A. Romero',
    country: 'USA',
    runtime: '96 min',
    genres: ['Horror', 'Cult Classic'],
    type: 'Narrative',
    color: 'B&W',
    sound: 'Sound',
    source: 'Internet Archive (livingDead_4k)',
    videoUrl: 'https://archive.org/download/livingDead_4k/livingDead_4k.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2000&auto=format&fit=crop',
    description: 'The definitive masterpiece of modern horror. George A. Romero’s social commentary disguised as a zombie thriller changed cinema forever. A ragtag group of survivors barricade themselves in a farmhouse as the dead begin to walk.',
    language: 'English',
    subtitles: [
      { lang: 'English', url: '#', code: 'EN' },
      { lang: 'Portuguese', url: '#', code: 'PT' },
      { lang: 'Spanish', url: '#', code: 'ES' },
      { lang: 'French', url: '#', code: 'FR' }
    ]
  },
  {
    id: 'metropolis-1927',
    title: 'Metropolis',
    year: 1927,
    director: 'Fritz Lang',
    country: 'Germany',
    runtime: '153 min',
    genres: ['Sci-Fi', 'Drama'],
    type: 'Narrative',
    color: 'B&W',
    sound: 'Silent',
    source: 'Internet Archive / Murnau Stiftung',
    // High-resolution direct link
    videoUrl: 'https://archive.org/download/Metropolis1927_201509/Metropolis1927_201509.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop',
    description: 'In a futuristic city sharply divided between the working class and the city planners, the son of the city\'s mastermind falls in love with a working-class prophet who predicts the coming of a savior.',
    language: 'German (Intertitles)',
    subtitles: [
      { lang: 'English', url: '#', code: 'EN' },
      { lang: 'Portuguese', url: '#', code: 'PT' }
    ]
  },
  {
    id: 'nosferatu-1922',
    title: 'Nosferatu',
    year: 1922,
    director: 'F.W. Murnau',
    country: 'Germany',
    runtime: '94 min',
    genres: ['Horror', 'Fantasy'],
    type: 'Narrative',
    color: 'B&W',
    sound: 'Silent',
    source: 'Public Domain / Archive.org',
    // Correct direct file link
    videoUrl: 'https://archive.org/download/Nosferatu_1922_Silent_Movie/Nosferatu_1922_Silent_Movie.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop',
    description: 'Vampire Count Orlok expresses interest in a new residence and real estate agent Hutter\'s wife.',
    language: 'German (Intertitles)',
    subtitles: [{ lang: 'English', url: '#', code: 'EN' }]
  }
];

export const DONATION_GOALS: DonationGoal[] = [
  { id: '1', title: 'Legacy Server Maintenance', target: 2000, current: 1420, icon: '🖥️' },
  { id: '2', title: 'Global Subtitle Project', target: 4000, current: 2850, icon: '💬' },
  { id: '3', title: '4K AI Film Restoration', target: 8000, current: 3100, icon: '✨' }
];

export const MISSION_STATEMENT = "Our mission is to rescue forgotten cinema, preserve cultural heritage, and make classic, experimental, and international films freely accessible to everyone, everywhere, without commercial interruption.";

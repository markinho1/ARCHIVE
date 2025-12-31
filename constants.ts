
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
    // Updated to User provided TMDB link
    posterUrl: 'https://image.tmdb.org/t/p/original/iLgyayS7fl6FrWDq7htq8K13WuI.jpg', 
    // Iconic still from the film (Karen Cooper) - 16:9
    backdropUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Night_of_the_Living_Dead_-_Karen_Cooper_2.jpg/1280px-Night_of_the_Living_Dead_-_Karen_Cooper_2.jpg',
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
    id: 'brain-wouldnt-die-1962',
    title: 'The Brain That Wouldn\'t Die',
    year: 1962,
    director: 'Joseph Green',
    country: 'USA',
    runtime: '82 min',
    genres: ['Horror', 'Sci-Fi'],
    type: 'Narrative',
    color: 'B&W',
    sound: 'Sound',
    source: 'Internet Archive (brain-wouldnt-die-4-k)',
    videoUrl: 'https://dn720302.ca.archive.org/0/items/brain-wouldnt-die-4-k/BrainWouldntDie_4K.ia.mp4',
    // User provided poster
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTZlZDMwZTYtMTg4ZS00MmQ4LWEzYWItZWQwYjFkMTBmMjgzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    // Title Card / Laboratory Scene - 16:9
    backdropUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/The_Brain_That_Wouldn%27t_Die_1962.jpg/1280px-The_Brain_That_Wouldn%27t_Die_1962.jpg',
    description: 'A brilliant but unorthodox surgeon revives the severed head of his fiancée after a car accident. While he hunts for a new body to attach it to, the head begins to telepathically control a mutant creature locked in his laboratory.',
    language: 'English',
    subtitles: [
      { lang: 'English', url: '#', code: 'EN' },
      { lang: 'Portuguese', url: '#', code: 'PT' }
    ]
  },
  {
    id: 'last-man-on-earth-1964',
    title: 'The Last Man on Earth',
    year: 1964,
    director: 'Ubaldo Ragona',
    country: 'Italy / USA',
    runtime: '86 min',
    genres: ['Horror', 'Sci-Fi'],
    type: 'Narrative',
    color: 'B&W',
    sound: 'Sound',
    source: 'Internet Archive (last-man-on-earth-4-k)',
    videoUrl: 'https://dn720401.ca.archive.org/0/items/last-man-on-earth-4-k/LastManOnEarth4K.ia.mp4',
    // Updated to user provided BW stylized poster
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMWE4MTFmYmUtMTY5MS00ZDJhLWJlM2MtYjU5Y2QyZjJiNTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    // Vincent Price Scene - 16:9
    backdropUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/The_Last_Man_on_Earth_%281964%29_-_Vincent_Price_2.jpg/1280px-The_Last_Man_on_Earth_%281964%29_-_Vincent_Price_2.jpg',
    description: 'Dr. Robert Morgan is the only survivor of a devastating global plague that has turned the rest of humanity into vampiric creatures. By day he hunts them; by night he barricades himself in his home. A chilling adaptation of Richard Matheson\'s "I Am Legend".',
    language: 'English',
    subtitles: [
      { lang: 'English', url: '#', code: 'EN' },
      { lang: 'Spanish', url: '#', code: 'ES' },
      { lang: 'Italian', url: '#', code: 'IT' }
    ]
  }
];

export const DONATION_GOALS: DonationGoal[] = [
  { id: '1', title: 'Legacy Server Maintenance', target: 2000, current: 1420, icon: '🖥️' },
  { id: '2', title: 'Global Subtitle Project', target: 4000, current: 2850, icon: '💬' },
  { id: '3', title: '4K AI Film Restoration', target: 8000, current: 3100, icon: '✨' }
];

export const MISSION_STATEMENT = "Our mission is to rescue forgotten cinema, preserve cultural heritage, and make classic, experimental, and international films freely accessible to everyone, everywhere, without commercial interruption.";

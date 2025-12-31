
import { Film, DonationGoal } from './types';

// Short 10s sample video for UI testing
const TEST_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';

export const FILMS: Film[] = [
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
    source: 'Internet Archive / Friedrich-Wilhelm-Murnau-Stiftung',
    videoUrl: TEST_VIDEO,
    thumbnailUrl: 'https://picsum.photos/seed/metropolis/800/1200',
    description: 'In a futuristic city sharply divided between the working class and the city planners, the son of the city\'s mastermind falls in love with a working-class prophet who predicts the coming of a savior to mediate their differences.',
    language: 'German (Intertitles)',
    subtitles: [
      { lang: 'English', url: '#', code: 'EN' },
      { lang: 'Portuguese', url: '#', code: 'PT' }
    ]
  },
  {
    id: 'night-living-dead-1968',
    title: 'Night of the Living Dead',
    year: 1968,
    director: 'George A. Romero',
    country: 'USA',
    runtime: '96 min',
    genres: ['Horror'],
    type: 'Narrative',
    color: 'B&W',
    sound: 'Sound',
    source: 'U.S. Copyright Office',
    videoUrl: TEST_VIDEO,
    thumbnailUrl: 'https://picsum.photos/seed/notld/800/1200',
    description: 'A ragtag group of Pennsylvanians barricade themselves in an abandoned farmhouse to remain safe from a second life-form that utilizes a weak spot in the human brain.',
    language: 'English',
    subtitles: [
      { lang: 'Spanish', url: '#', code: 'ES' },
      { lang: 'French', url: '#', code: 'FR' }
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
    source: 'Public Domain Mark 1.0',
    videoUrl: TEST_VIDEO,
    thumbnailUrl: 'https://picsum.photos/seed/nosferatu/800/1200',
    description: 'Vampire Count Orlok expresses interest in a new residence and real estate agent Hutter\'s wife.',
    language: 'German (Intertitles)',
    subtitles: [{ lang: 'English', url: '#', code: 'EN' }]
  }
];

export const DONATION_GOALS: DonationGoal[] = [
  { id: '1', title: 'Launch Android App', target: 1500, current: 850, icon: '📱' },
  { id: '2', title: 'Subtitle Expansion', target: 3000, current: 2100, icon: '💬' },
  { id: '3', title: 'Film Restoration Fund', target: 5000, current: 1200, icon: '🎞️' }
];

export const MISSION_STATEMENT = "Our mission is to rescue forgotten cinema, preserve cultural heritage, and make classic, experimental, and international films freely accessible to everyone, everywhere.";

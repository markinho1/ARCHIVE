
import { Film, DonationGoal } from './types';

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
    videoUrl: 'https://archive.org/download/Metropolis_1927/Metropolis_1927.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/metropolis/800/1200',
    description: 'In a futuristic city sharply divided between the working class and the city planners, the son of the city\'s mastermind falls in love with a working-class prophet who predicts the coming of a savior to mediate their differences.',
    language: 'German (Intertitles)',
    subtitles: [{ lang: 'English', url: '#', code: 'EN' }]
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
    source: 'U.S. Copyright Office (Lapsed Copyright due to missing notice)',
    videoUrl: 'https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/notld/800/1200',
    description: 'A ragtag group of Pennsylvanians barricade themselves in an abandoned farmhouse to remain safe from a second life-form that utilizes a weak spot in the human brain (flesh-eating zombification).',
    language: 'English',
    subtitles: [{ lang: 'Spanish', url: '#', code: 'ES' }]
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
    videoUrl: 'https://archive.org/download/Nosferatu_1922/Nosferatu_1922.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/nosferatu/800/1200',
    description: 'Vampire Count Orlok expresses interest in a new residence and real estate agent Hutter\'s wife.',
    language: 'German (Intertitles)',
    subtitles: [{ lang: 'English', url: '#', code: 'EN' }]
  },
  {
    id: 'trip-moon-1902',
    title: 'A Trip to the Moon',
    year: 1902,
    director: 'Georges Méliès',
    country: 'France',
    runtime: '13 min',
    genres: ['Sci-Fi', 'Experimental'],
    type: 'Experimental',
    color: 'B&W',
    sound: 'Silent',
    source: 'Expired Copyright',
    videoUrl: 'https://archive.org/download/as_trip_to_the_moon/as_trip_to_the_moon.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/tripm/800/1200',
    description: 'A group of astronomers go on an expedition to the Moon, where they are captured by lunar inhabitants.',
    language: 'None',
    subtitles: []
  },
  {
    id: 'the-general-1926',
    title: 'The General',
    year: 1926,
    director: 'Buster Keaton',
    country: 'USA',
    runtime: '79 min',
    genres: ['Comedy', 'Action'],
    type: 'Narrative',
    color: 'B&W',
    sound: 'Silent',
    source: 'Expired Copyright',
    videoUrl: 'https://archive.org/download/TheGeneral_1926/TheGeneral_1926.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/general/800/1200',
    description: 'When Union spies steal an engineer\'s beloved locomotive, he pursues it single-handedly and straight through enemy lines.',
    language: 'English (Intertitles)',
    subtitles: []
  },
  {
    id: 'm-1931',
    title: 'M',
    year: 1931,
    director: 'Fritz Lang',
    country: 'Germany',
    runtime: '117 min',
    genres: ['Thriller', 'Crime'],
    type: 'Narrative',
    color: 'B&W',
    sound: 'Sound',
    source: 'Public Domain',
    videoUrl: 'https://archive.org/download/M_1931/M_1931.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/mlang/800/1200',
    description: 'When the police in a German city are unable to catch a child-murderer, other criminals join in the manhunt.',
    language: 'German',
    subtitles: [{ lang: 'English', url: '#', code: 'EN' }]
  }
];

export const DONATION_GOALS: DonationGoal[] = [
  { id: '1', title: 'Launch Android App', target: 1500, current: 850, icon: '📱' },
  { id: '2', title: 'Subtitle Expansion', target: 3000, current: 2100, icon: '💬' },
  { id: '3', title: 'Film Restoration Fund', target: 5000, current: 1200, icon: '🎞️' }
];

export const MISSION_STATEMENT = "Our mission is to rescue forgotten cinema, preserve cultural heritage, and make classic, experimental, and international films freely accessible to everyone, everywhere. No ads, no paywalls—just history.";

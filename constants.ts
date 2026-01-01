
import { Film, DonationGoal } from './types';

// CONFIGURAÇÃO DA INTEGRAÇÃO WORDPRESS
// Substitua pela URL do seu site WordPress no Google Cloud
// Exemplo: 'https://seusite.com/wp-json/wp/v2'
export const WORDPRESS_API_URL = 'https://demo.wp-api.org/wp-json/wp/v2'; 

export const FILMS: Film[] = [
  {
    id: 'night-living-dead-1968',
    title: 'Night of the Living Dead',
    year: 1968,
    director: 'George A. Romero',
    country: 'EUA',
    runtime: '96 min',
    genres: ['Terror', 'Clássico Cult'],
    type: 'Narrativa',
    color: 'Preto & Branco',
    sound: 'Som',
    source: 'Internet Archive (livingDead_4k)',
    videoUrl: 'https://archive.org/download/livingDead_4k/livingDead_4k.mp4',
    posterUrl: 'https://image.tmdb.org/t/p/original/iLgyayS7fl6FrWDq7htq8K13WuI.jpg', 
    backdropUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Night_of_the_Living_Dead_-_Karen_Cooper_2.jpg/1280px-Night_of_the_Living_Dead_-_Karen_Cooper_2.jpg',
    description: 'A obra-prima definitiva do terror moderno. O comentário social de George A. Romero disfarçado de thriller zumbi mudou o cinema para sempre. Um grupo de sobreviventes se barricada em uma casa de fazenda enquanto os mortos começam a caminhar.',
    language: 'Inglês',
    subtitles: [
      { lang: 'Inglês', url: '#', code: 'EN' },
      { lang: 'Português', url: '#', code: 'PT' },
      { lang: 'Espanhol', url: '#', code: 'ES' },
      { lang: 'Francês', url: '#', code: 'FR' }
    ],
    isRestricted: false
  },
  {
    id: 'brain-wouldnt-die-1962',
    title: 'The Brain That Wouldn\'t Die',
    year: 1962,
    director: 'Joseph Green',
    country: 'EUA',
    runtime: '82 min',
    genres: ['Terror', 'Ficção Científica'],
    type: 'Narrativa',
    color: 'Preto & Branco',
    sound: 'Som',
    source: 'Internet Archive (brain-wouldnt-die-4-k)',
    videoUrl: 'https://dn720302.ca.archive.org/0/items/brain-wouldnt-die-4-k/BrainWouldntDie_4K.ia.mp4',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTZlZDMwZTYtMTg4ZS00MmQ4LWEzYWItZWQwYjFkMTBmMjgzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/The_Brain_That_Wouldn%27t_Die_1962.jpg/1280px-The_Brain_That_Wouldn%27t_Die_1962.jpg',
    description: 'Um cirurgião brilhante, mas pouco ortodoxo, revive a cabeça decepada de sua noiva após um acidente de carro. Enquanto ele caça um novo corpo para anexá-la, a cabeça começa a controlar telepaticamente uma criatura mutante trancada em seu laboratório.',
    language: 'Inglês',
    subtitles: [
      { lang: 'Inglês', url: '#', code: 'EN' },
      { lang: 'Português', url: '#', code: 'PT' }
    ],
    isRestricted: true // Exemplo: Filme exclusivo para membros
  },
  {
    id: 'last-man-on-earth-1964',
    title: 'The Last Man on Earth',
    year: 1964,
    director: 'Ubaldo Ragona',
    country: 'Itália / EUA',
    runtime: '86 min',
    genres: ['Terror', 'Ficção Científica'],
    type: 'Narrativa',
    color: 'Preto & Branco',
    sound: 'Som',
    source: 'Internet Archive (last-man-on-earth-4-k)',
    videoUrl: 'https://dn720401.ca.archive.org/0/items/last-man-on-earth-4-k/LastManOnEarth4K.ia.mp4',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMWE4MTFmYmUtMTY5MS00ZDJhLWJlM2MtYjU5Y2QyZjJiNTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    backdropUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/The_Last_Man_on_Earth_%281964%29_-_Vincent_Price_2.jpg/1280px-The_Last_Man_on_Earth_%281964%29_-_Vincent_Price_2.jpg',
    description: 'O Dr. Robert Morgan é o único sobrevivente de uma praga global devastadora que transformou o resto da humanidade em criaturas vampíricas. De dia ele os caça; à noite ele se barricada em sua casa. Uma adaptação arrepiante de "Eu Sou a Lenda" de Richard Matheson.',
    language: 'Inglês',
    subtitles: [
      { lang: 'Inglês', url: '#', code: 'EN' },
      { lang: 'Espanhol', url: '#', code: 'ES' },
      { lang: 'Italiano', url: '#', code: 'IT' }
    ],
    isRestricted: false
  }
];

export const DONATION_GOALS: DonationGoal[] = [
  { id: '1', title: 'Manutenção de Servidores', target: 15000, current: 8420, icon: '🖥️' },
  { id: '2', title: 'Restauração de Filmes', target: 30000, current: 12150, icon: '🎞️' },
  { id: '3', title: 'Aplicativo Móvel', target: 50000, current: 5400, icon: '📱' }
];

export const MISSION_STATEMENT = "Nossa missão é resgatar o cinema esquecido, preservar o patrimônio cultural e tornar filmes clássicos, experimentais e internacionais acessíveis gratuitamente a todos, em todos os lugares, sem interrupção comercial.";

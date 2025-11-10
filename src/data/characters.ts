import { CharacterType } from '../types/game';

export interface CharacterData {
  id: CharacterType;
  name: string;
  role: string;
  description: string;
  color: string;
}

export const characters: Record<CharacterType, CharacterData> = {
  player: {
    id: 'player',
    name: 'You',
    role: 'Protagonist',
    description: 'Your character navigating middle school',
    color: '#3b82f6',
  },
  bestFriend: {
    id: 'bestFriend',
    name: 'Jordan',
    role: 'Best Friend',
    description: 'Your closest friend who you trust',
    color: '#f59e0b',
  },
  newStudent: {
    id: 'newStudent',
    name: 'Alex',
    role: 'New Student',
    description: 'Recently transferred, looking for friends',
    color: '#8b5cf6',
  },
  rival: {
    id: 'rival',
    name: 'Sam',
    role: 'Academic Rival',
    description: 'Competitive classmate pushing you to excel',
    color: '#ef4444',
  },
  teacher: {
    id: 'teacher',
    name: 'Ms. Rodriguez',
    role: 'Teacher',
    description: 'Understanding teacher who notices when students struggle',
    color: '#10b981',
  },
  counselor: {
    id: 'counselor',
    name: 'Mr. Chen',
    role: 'School Counselor',
    description: 'Professional support for bigger challenges',
    color: '#06b6d4',
  },
  parent: {
    id: 'parent',
    name: 'Parent',
    role: 'Family',
    description: 'Your guardian at home',
    color: '#ec4899',
  },
  influencer: {
    id: 'influencer',
    name: '@MindsetGuru',
    role: 'Online Influencer',
    description: 'Popular social media personality',
    color: '#a855f7',
  },
};

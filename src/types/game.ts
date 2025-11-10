export type EmotionType =
  | 'happy' | 'content' | 'proud' | 'accomplished'
  | 'sad' | 'disappointed' | 'hurt' | 'lonely'
  | 'angry' | 'frustrated' | 'annoyed' | 'betrayed'
  | 'anxious' | 'worried' | 'stressed' | 'overwhelmed'
  | 'calm' | 'peaceful' | 'relieved' | 'hopeful'
  | 'confused' | 'uncertain' | 'conflicted';

export type CharacterType =
  | 'player'
  | 'bestFriend'
  | 'newStudent'
  | 'rival'
  | 'teacher'
  | 'counselor'
  | 'parent'
  | 'influencer';

export interface PlayerCharacter {
  name: string;
  pronouns: 'he/him' | 'she/her' | 'they/them';
  appearance: {
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    outfit: string;
  };
  emotionState: EmotionType;
  stats: {
    selfRespect: number;
    empathy: number;
    courage: number;
    criticalThinking: number;
  };
}

export interface RelationshipMeter {
  characterId: CharacterType;
  trustLevel: number;
  unlocked: boolean;
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  effects: {
    emotion?: EmotionType;
    relationships?: { characterId: CharacterType; change: number }[];
    stats?: { stat: keyof PlayerCharacter['stats']; change: number }[];
    unlockSkill?: string;
  };
}

export interface DialogueLine {
  speaker: CharacterType | 'narrator';
  text: string;
  emotion?: EmotionType;
}

export interface Scene {
  id: string;
  act: number;
  title: string;
  background: string;
  dialogue: DialogueLine[];
  choices?: Choice[];
  minigame?: MiniGameType;
  autoProgress?: {
    delay: number;
    nextSceneId: string;
  };
}

export type MiniGameType =
  | 'emotionRecognition'
  | 'breathingRhythm'
  | 'factCheck'
  | 'socialMediaScroll'
  | 'scenarioSorting'
  | 'filterReality';

export interface GameState {
  currentSceneId: string;
  visitedScenes: string[];
  player: PlayerCharacter;
  relationships: RelationshipMeter[];
  unlockedSkills: string[];
  achievements: string[];
  emotionVocabulary: EmotionType[];
  choices: { sceneId: string; choiceId: string }[];
}

export interface SaveData {
  gameState: GameState;
  timestamp: number;
  version: string;
}

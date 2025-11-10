import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState, PlayerCharacter, RelationshipMeter, CharacterType, EmotionType } from '../types/game';

interface GameContextType {
  gameState: GameState;
  updateEmotion: (emotion: EmotionType) => void;
  updateRelationship: (characterId: CharacterType, change: number) => void;
  updateStat: (stat: keyof PlayerCharacter['stats'], change: number) => void;
  unlockSkill: (skill: string) => void;
  addAchievement: (achievement: string) => void;
  makeChoice: (sceneId: string, choiceId: string) => void;
  navigateToScene: (sceneId: string) => void;
  updatePlayer: (player: Partial<PlayerCharacter>) => void;
  saveGame: () => void;
  loadGame: () => boolean;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialRelationships: RelationshipMeter[] = [
  { characterId: 'bestFriend', trustLevel: 50, unlocked: true },
  { characterId: 'newStudent', trustLevel: 0, unlocked: false },
  { characterId: 'rival', trustLevel: 30, unlocked: true },
  { characterId: 'teacher', trustLevel: 40, unlocked: true },
  { characterId: 'counselor', trustLevel: 20, unlocked: true },
  { characterId: 'parent', trustLevel: 60, unlocked: true },
];

const initialPlayer: PlayerCharacter = {
  name: '',
  pronouns: 'they/them',
  appearance: {
    skinTone: 'light',
    hairStyle: 'short',
    hairColor: 'brown',
    outfit: 'casual',
  },
  emotionState: 'calm',
  stats: {
    selfRespect: 50,
    empathy: 50,
    courage: 50,
    criticalThinking: 50,
  },
};

const initialGameState: GameState = {
  currentSceneId: 'welcome',
  visitedScenes: [],
  player: initialPlayer,
  relationships: initialRelationships,
  unlockedSkills: [],
  achievements: [],
  emotionVocabulary: ['happy', 'sad', 'angry', 'worried', 'calm'],
  choices: [],
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  useEffect(() => {
    const saved = localStorage.getItem('trustquest_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setGameState(data.gameState);
      } catch (e) {
        console.error('Failed to load save:', e);
      }
    }
  }, []);

  const saveGame = () => {
    const saveData = {
      gameState,
      timestamp: Date.now(),
      version: '1.0.0',
    };
    localStorage.setItem('trustquest_save', JSON.stringify(saveData));
  };

  const loadGame = (): boolean => {
    const saved = localStorage.getItem('trustquest_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setGameState(data.gameState);
        return true;
      } catch (e) {
        console.error('Failed to load save:', e);
        return false;
      }
    }
    return false;
  };

  const resetGame = () => {
    setGameState(initialGameState);
    localStorage.removeItem('trustquest_save');
  };

  const updateEmotion = (emotion: EmotionType) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, emotionState: emotion },
      emotionVocabulary: prev.emotionVocabulary.includes(emotion)
        ? prev.emotionVocabulary
        : [...prev.emotionVocabulary, emotion],
    }));
  };

  const updateRelationship = (characterId: CharacterType, change: number) => {
    setGameState(prev => ({
      ...prev,
      relationships: prev.relationships.map(rel =>
        rel.characterId === characterId
          ? { ...rel, trustLevel: Math.max(0, Math.min(100, rel.trustLevel + change)) }
          : rel
      ),
    }));
  };

  const updateStat = (stat: keyof PlayerCharacter['stats'], change: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        stats: {
          ...prev.player.stats,
          [stat]: Math.max(0, Math.min(100, prev.player.stats[stat] + change)),
        },
      },
    }));
  };

  const unlockSkill = (skill: string) => {
    setGameState(prev => ({
      ...prev,
      unlockedSkills: prev.unlockedSkills.includes(skill)
        ? prev.unlockedSkills
        : [...prev.unlockedSkills, skill],
    }));
  };

  const addAchievement = (achievement: string) => {
    setGameState(prev => ({
      ...prev,
      achievements: prev.achievements.includes(achievement)
        ? prev.achievements
        : [...prev.achievements, achievement],
    }));
  };

  const makeChoice = (sceneId: string, choiceId: string) => {
    setGameState(prev => ({
      ...prev,
      choices: [...prev.choices, { sceneId, choiceId }],
    }));
  };

  const navigateToScene = (sceneId: string) => {
    setGameState(prev => ({
      ...prev,
      currentSceneId: sceneId,
      visitedScenes: prev.visitedScenes.includes(sceneId)
        ? prev.visitedScenes
        : [...prev.visitedScenes, sceneId],
    }));
  };

  const updatePlayer = (playerUpdate: Partial<PlayerCharacter>) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, ...playerUpdate },
    }));
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        updateEmotion,
        updateRelationship,
        updateStat,
        unlockSkill,
        addAchievement,
        makeChoice,
        navigateToScene,
        updatePlayer,
        saveGame,
        loadGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}

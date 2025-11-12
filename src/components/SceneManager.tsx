import { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { scenes } from '../data/scenes';
import { Choice } from '../types/game';
import DialogueBox from './DialogueBox';
import ChoiceBox from './ChoiceBox';
import CharacterCreator from './CharacterCreator';
import GameGuide from './GameGuide';
import EmotionRecognition from './minigames/EmotionRecognition';
import BreathingRhythm from './minigames/BreathingRhythm';
import SocialMediaScroll from './minigames/SocialMediaScroll';
import FactCheck from './minigames/FactCheck';
import ScenarioSorting from './minigames/ScenarioSorting';
import GameSummary from './GameSummary';
import GameUI from './GameUI';

export default function SceneManager() {
  const {
    gameState,
    navigateToScene,
    updateEmotion,
    updateRelationship,
    updateStat,
    unlockSkill,
    makeChoice,
    saveGame,
  } = useGame();

  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [showMinigame, setShowMinigame] = useState(false);

  const currentScene = scenes[gameState.currentSceneId];

  useEffect(() => {
    setDialogueIndex(0);
    setShowChoices(false);
    setShowMinigame(false);
  }, [gameState.currentSceneId]);

  useEffect(() => {
    saveGame();
  }, [gameState, saveGame]);

  const handleDialogueComplete = () => {
    if (dialogueIndex < currentScene.dialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      if (currentScene.minigame) {
        setShowMinigame(true);
      } else if (currentScene.choices && currentScene.choices.length > 0) {
        setShowChoices(true);
      } else if (currentScene.autoProgress) {
        setTimeout(() => {
          navigateToScene(currentScene.autoProgress!.nextSceneId);
        }, currentScene.autoProgress.delay);
      }
    }
  };

  const handleChoice = (choice: Choice) => {
    makeChoice(currentScene.id, choice.id);

    if (choice.effects.emotion) {
      updateEmotion(choice.effects.emotion);
    }

    if (choice.effects.relationships) {
      choice.effects.relationships.forEach(({ characterId, change }) => {
        updateRelationship(characterId, change);
      });
    }

    if (choice.effects.stats) {
      choice.effects.stats.forEach(({ stat, change }) => {
        updateStat(stat, change);
      });
    }

    if (choice.effects.unlockSkill) {
      unlockSkill(choice.effects.unlockSkill);
    }

    navigateToScene(choice.nextSceneId);
  };

  const handleMinigameComplete = () => {
    setShowMinigame(false);
    if (currentScene.choices && currentScene.choices.length > 0) {
      setShowChoices(true);
    }
  };

  const handleCharacterCreationComplete = () => {
    navigateToScene('first_day');
  };

  const handleGameGuideComplete = () => {
    navigateToScene('character_creation');
  };

  if (currentScene.id === 'game_guide') {
    return <GameGuide onComplete={handleGameGuideComplete} />;
  }

  if (currentScene.id === 'character_creation') {
    return <CharacterCreator onComplete={handleCharacterCreationComplete} />;
  }

  if (currentScene.id === 'final_summary') {
    return <GameSummary />;
  }

  if (showMinigame) {
    switch (currentScene.minigame) {
      case 'emotionRecognition':
        return <EmotionRecognition onComplete={handleMinigameComplete} />;
      case 'breathingRhythm':
        return <BreathingRhythm onComplete={handleMinigameComplete} />;
      case 'socialMediaScroll':
        return <SocialMediaScroll onComplete={handleMinigameComplete} />;
      case 'factCheck':
        return <FactCheck onComplete={handleMinigameComplete} />;
      case 'scenarioSorting':
        return <ScenarioSorting onComplete={handleMinigameComplete} />;
      default:
        return null;
    }
  }

  return (
    <div className={`min-h-screen ${currentScene.background} transition-all duration-1000`}>
      <GameUI />

      <div className="flex flex-col justify-end min-h-screen p-4 pb-8">
        <div className="space-y-6">
          {!showChoices && currentScene.dialogue.length > 0 && (
            <DialogueBox
              dialogue={currentScene.dialogue[dialogueIndex]}
              onComplete={handleDialogueComplete}
              autoAdvance={currentScene.autoProgress !== undefined}
            />
          )}

          {showChoices && currentScene.choices && (
            <ChoiceBox choices={currentScene.choices} onSelect={handleChoice} />
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { DialogueLine, CharacterType } from '../types/game';
import { characters } from '../data/characters';
import { useGame } from '../contexts/GameContext';

interface DialogueBoxProps {
  dialogue: DialogueLine;
  onComplete: () => void;
  autoAdvance?: boolean;
}

export default function DialogueBox({ dialogue, onComplete, autoAdvance = false }: DialogueBoxProps) {
  const { gameState } = useGame();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < dialogue.text.length) {
        setDisplayedText(dialogue.text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        if (autoAdvance) {
          setTimeout(onComplete, 1500);
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [dialogue, autoAdvance, onComplete]);

  const handleClick = () => {
    if (!isComplete) {
      setDisplayedText(dialogue.text);
      setIsComplete(true);
    } else {
      onComplete();
    }
  };

  const getSpeakerName = () => {
    if (dialogue.speaker === 'narrator') return null;
    if (dialogue.speaker === 'player') return gameState.player.name || 'You';
    return characters[dialogue.speaker as CharacterType]?.name || 'Unknown';
  };

  const getSpeakerColor = () => {
    if (dialogue.speaker === 'narrator') return '#6b7280';
    if (dialogue.speaker === 'player') return '#3b82f6';
    return characters[dialogue.speaker as CharacterType]?.color || '#6b7280';
  };

  const speakerName = getSpeakerName();
  const isNarrator = dialogue.speaker === 'narrator';

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transition-all flex flex-col ${
        isNarrator
          ? 'bg-gray-800 bg-opacity-90 text-white italic'
          : 'bg-white bg-opacity-95 text-gray-800'
      } rounded-2xl shadow-2xl border-4 w-full max-w-[1040px] mx-auto px-6 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7`}
      style={{ borderColor: getSpeakerColor() }}
    >
      {speakerName && (
        <div
          className="font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2"
          style={{ color: getSpeakerColor() }}
        >
          {speakerName}
        </div>
      )}
      <div className={`text-base sm:text-lg leading-relaxed flex-1 overflow-y-auto max-h-[calc(40vh-60px)] pr-2 ${isNarrator ? 'text-gray-100' : 'text-gray-800'}`}>
        {displayedText}
        {!isComplete && <span className="animate-pulse">|</span>}
      </div>
      {isComplete && !autoAdvance && (
        <div className="text-right mt-3 sm:mt-4 pt-2 border-t border-gray-300 border-opacity-20">
          <span className="text-xs sm:text-sm opacity-70 inline-block">Click to continue</span>
        </div>
      )}
    </div>
  );
}

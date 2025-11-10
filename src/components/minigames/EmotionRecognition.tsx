import { useState } from 'react';
import { Smile, Frown, Angry, Worried, Sparkles } from 'lucide-react';
import { EmotionType } from '../../types/game';
import { useGame } from '../../contexts/GameContext';

interface EmotionRecognitionProps {
  onComplete: () => void;
}

const scenarios = [
  {
    description: 'Alex sits alone, looking down at their phone. Their shoulders are slumped, and they keep glancing around the cafeteria.',
    correctEmotion: 'lonely' as EmotionType,
    options: [
      { emotion: 'lonely' as EmotionType, label: 'Lonely', icon: Frown },
      { emotion: 'angry' as EmotionType, label: 'Angry', icon: Angry },
      { emotion: 'happy' as EmotionType, label: 'Happy', icon: Smile },
      { emotion: 'calm' as EmotionType, label: 'Calm', icon: Sparkles },
    ],
  },
];

export default function EmotionRecognition({ onComplete }: EmotionRecognitionProps) {
  const { updateStat, unlockSkill } = useGame();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = scenarios[0];

  const handleSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    const correct = emotion === scenario.correctEmotion;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      updateStat('empathy', 10);
      unlockSkill('emotion_recognition');
    }

    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Read the Room</h2>
          <p className="text-gray-600">What emotion do you think Alex is feeling?</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 border-2 border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed">{scenario.description}</p>
        </div>

        {!showFeedback ? (
          <div className="grid grid-cols-2 gap-4">
            {scenario.options.map(({ emotion, label, icon: Icon }) => (
              <button
                key={emotion}
                onClick={() => handleSelect(emotion)}
                className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg"
              >
                <Icon className="w-12 h-12 text-blue-600" />
                <span className="text-xl font-semibold text-gray-800">{label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div
            className={`text-center p-8 rounded-xl ${
              isCorrect
                ? 'bg-green-100 border-4 border-green-500'
                : 'bg-amber-100 border-4 border-amber-500'
            }`}
          >
            <div className="text-3xl font-bold mb-4">
              {isCorrect ? '✓ Correct!' : 'Good try!'}
            </div>
            <p className="text-lg text-gray-800">
              {isCorrect
                ? 'You recognized that Alex feels lonely. Being able to identify emotions in others helps you be more empathetic.'
                : `Alex is feeling lonely. They're in a crowded room but feel disconnected. You'll get better at recognizing emotions with practice!`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

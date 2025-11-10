import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

interface BreathingRhythmProps {
  onComplete: () => void;
}

export default function BreathingRhythm({ onComplete }: BreathingRhythmProps) {
  const { unlockSkill } = useGame();
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);
  const totalCycles = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else {
            const newCycles = cycles + 1;
            setCycles(newCycles);
            if (newCycles >= totalCycles) {
              unlockSkill('deep_breathing');
              setTimeout(onComplete, 1000);
            } else {
              setPhase('inhale');
              return 4;
            }
          }
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, cycles, onComplete, unlockSkill]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
    }
  };

  const getScaleClass = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-150';
      case 'hold':
        return 'scale-150';
      case 'exhale':
        return 'scale-75';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Deep Breathing</h2>
        <p className="text-xl text-white mb-8">
          Follow the rhythm to calm yourself
        </p>

        <div className="relative w-80 h-80 mx-auto mb-8">
          <div
            className={`absolute inset-0 bg-white bg-opacity-40 rounded-full transition-all duration-1000 ease-in-out ${getScaleClass()}`}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white mb-4">{count}</div>
            <div className="text-3xl font-semibold text-white">{getPhaseText()}</div>
          </div>
        </div>

        <div className="text-white text-xl">
          Cycle {cycles + 1} of {totalCycles}
        </div>

        <div className="mt-8 max-w-md mx-auto bg-white bg-opacity-20 rounded-xl p-4 text-white">
          <p className="text-sm">
            Deep breathing activates your body's relaxation response and helps manage stress.
          </p>
        </div>
      </div>
    </div>
  );
}

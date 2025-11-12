import { useState } from 'react';
import { Pause, Play, RotateCcw, Heart, Brain, Shield, Sparkles, Menu, X } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { characters } from '../data/characters';

interface HUDProps {
  hideOnGuide?: boolean;
}

export default function HUD({ hideOnGuide = false }: HUDProps) {
  const { gameState, resetGame, saveGame } = useGame();
  const [showStats, setShowStats] = useState(false);
  const [showPause, setShowPause] = useState(false);

  const emotionColors: Record<string, string> = {
    happy: 'text-yellow-500',
    content: 'text-green-500',
    proud: 'text-blue-500',
    sad: 'text-blue-400',
    angry: 'text-red-500',
    anxious: 'text-purple-500',
    stressed: 'text-orange-500',
    overwhelmed: 'text-red-400',
    calm: 'text-teal-500',
    relieved: 'text-green-400',
    hopeful: 'text-cyan-500',
    worried: 'text-amber-500',
    lonely: 'text-indigo-400',
    conflicted: 'text-gray-500',
    disappointed: 'text-slate-500',
    frustrated: 'text-red-600',
    guilty: 'text-purple-400',
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to restart? Your progress will be lost.')) {
      resetGame();
      setShowPause(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setShowPause(!showPause)}
            className="text-white hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Pause game"
            tabIndex={0}
          >
            {showPause ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
          </button>

          <div className={`flex items-center gap-2 ${emotionColors[gameState.player.emotionState] || 'text-gray-400'}`}>
            <Heart className="w-5 h-5" />
            <span className="text-white text-sm capitalize font-medium" aria-label={`Emotion: ${gameState.player.emotionState}`}>
              {gameState.player.emotionState}
            </span>
          </div>

          <button
            onClick={() => setShowStats(!showStats)}
            className="text-white hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Open progress and stats"
            tabIndex={0}
          >
            {showStats ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {showStats && (
        <div className="fixed top-16 right-4 z-40 bg-white rounded-xl shadow-2xl p-6 w-80 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Skills</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Self-Respect
                  </span>
                  <span className="font-semibold text-blue-600">{gameState.player.stats.selfRespect}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    Empathy
                  </span>
                  <span className="font-semibold text-pink-600">{gameState.player.stats.empathy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Courage
                  </span>
                  <span className="font-semibold text-amber-600">{gameState.player.stats.courage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    Critical Thinking
                  </span>
                  <span className="font-semibold text-purple-600">{gameState.player.stats.criticalThinking}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Relationships</h4>
              <div className="space-y-2">
                {gameState.relationships
                  .filter((rel) => rel.unlocked)
                  .map((rel) => (
                    <div key={rel.characterId} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{characters[rel.characterId].name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                            style={{ width: `${rel.trustLevel}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8">{rel.trustLevel}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {gameState.unlockedSkills.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Unlocked Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {gameState.unlockedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {skill.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {gameState.achievements.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Achievements</h4>
                <div className="space-y-1">
                  {gameState.achievements.map((achievement) => (
                    <div key={achievement} className="text-sm text-gray-600 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      {achievement.replace(/_/g, ' ')}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showPause && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Paused</h2>

            <div className="space-y-4">
              <button
                onClick={() => setShowPause(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Continue Playing
              </button>

              <button
                onClick={saveGame}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Save Game
              </button>

              <button
                onClick={handleReset}
                className="w-full bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <RotateCcw className="w-5 h-5" />
                Restart Game
              </button>

              <div className="bg-teal-50 rounded-xl p-4 border-2 border-teal-200 mt-6">
                <h3 className="font-semibold text-teal-800 mb-2">Take a Break</h3>
                <p className="text-sm text-teal-700">
                  It's okay to pause and take care of yourself. Come back when you're ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

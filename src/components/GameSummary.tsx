import { useGame } from '../contexts/GameContext';
import { Trophy, Heart, Brain, Shield, Sparkles, BookOpen, RefreshCw } from 'lucide-react';

export default function GameSummary() {
  const { gameState, resetGame } = useGame();

  const getStatLevel = (value: number) => {
    if (value >= 80) return { label: 'Excellent', color: 'text-green-600' };
    if (value >= 60) return { label: 'Good', color: 'text-blue-600' };
    if (value >= 40) return { label: 'Growing', color: 'text-amber-600' };
    return { label: 'Developing', color: 'text-gray-600' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8">
        <div className="text-center mb-8">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Journey Complete!</h1>
          <p className="text-xl text-gray-600">
            Great job, {gameState.player.name}! Here's what you accomplished.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-500" />
                Your Growth
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Shield className="w-5 h-5 text-blue-500" />
                      Self-Respect
                    </span>
                    <span className={`font-bold ${getStatLevel(gameState.player.stats.selfRespect).color}`}>
                      {getStatLevel(gameState.player.stats.selfRespect).label}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                      style={{ width: `${gameState.player.stats.selfRespect}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Heart className="w-5 h-5 text-pink-500" />
                      Empathy
                    </span>
                    <span className={`font-bold ${getStatLevel(gameState.player.stats.empathy).color}`}>
                      {getStatLevel(gameState.player.stats.empathy).label}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-pink-600 transition-all"
                      style={{ width: `${gameState.player.stats.empathy}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Courage
                    </span>
                    <span className={`font-bold ${getStatLevel(gameState.player.stats.courage).color}`}>
                      {getStatLevel(gameState.player.stats.courage).label}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all"
                      style={{ width: `${gameState.player.stats.courage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Brain className="w-5 h-5 text-purple-500" />
                      Critical Thinking
                    </span>
                    <span className={`font-bold ${getStatLevel(gameState.player.stats.criticalThinking).color}`}>
                      {getStatLevel(gameState.player.stats.criticalThinking).label}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all"
                      style={{ width: `${gameState.player.stats.criticalThinking}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {gameState.achievements.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Achievements
                </h3>
                <div className="space-y-2">
                  {gameState.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg p-3"
                    >
                      <span className="text-gray-800 capitalize">
                        {achievement.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {gameState.unlockedSkills.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Skills You Learned
                </h3>
                <div className="flex flex-wrap gap-2">
                  {gameState.unlockedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium text-sm"
                    >
                      {skill.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-300">
              <h3 className="font-bold text-teal-800 mb-3 text-lg">Take These With You</h3>

              <div className="space-y-3 text-sm text-teal-900">
                <p className="font-semibold">You learned that:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Naming your emotions helps you understand and manage them</li>
                  <li>Not everything online shows the full picture</li>
                  <li>Being a good friend includes encouraging professional help when needed</li>
                  <li>Asking for help is a sign of strength, not weakness</li>
                  <li>Different problems need different types of support</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300">
              <h3 className="font-bold text-blue-800 mb-3">Real Support Resources</h3>

              <div className="space-y-2 text-sm text-blue-900">
                <div>
                  <div className="font-semibold">988 Suicide & Crisis Lifeline</div>
                  <div className="text-xs text-blue-700">Call or text 988 anytime, 24/7</div>
                </div>

                <div>
                  <div className="font-semibold">School Counselor</div>
                  <div className="text-xs text-blue-700">Available during school hours</div>
                </div>

                <div>
                  <div className="font-semibold">Trusted Adult</div>
                  <div className="text-xs text-blue-700">Parent, teacher, coach, or family member</div>
                </div>

                <p className="mt-3 text-xs italic">
                  If you're struggling with something in real life, these people want to help.
                  You deserve support.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Play Again
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Thank you for playing Trust Quest!</p>
          <p className="mt-1">Remember: Your feelings matter, and help is always available.</p>
        </div>
      </div>
    </div>
  );
}

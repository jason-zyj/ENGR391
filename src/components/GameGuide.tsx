import { Pause, Lightbulb, TrendingUp } from 'lucide-react';

interface GameGuideProps {
  onComplete: () => void;
}

export default function GameGuide({ onComplete }: GameGuideProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">How to Play</h1>
          <p className="text-gray-600">Learn about the UI and game features</p>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 text-white p-3 rounded-full">
                  <Pause className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Pause Button</h2>
              </div>
              <div className="text-gray-700">
                <p className="text-sm mb-3">
                  Located in the <span className="font-semibold">top left corner</span> of the game screen.
                </p>
                <p className="text-sm">
                  Click it anytime to pause the game and take a break. No pressure—play at your own pace!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500 text-white p-3 rounded-full">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Your Emotion</h2>
              </div>
              <div className="text-gray-700">
                <p className="text-sm mb-3">
                  Displayed in the <span className="font-semibold">top middle</span> of the game screen.
                </p>
                <p className="text-sm">
                  This shows your character's current emotional state. Your choices influence how your character feels throughout the game.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Progress & Stats</h2>
              </div>
              <div className="text-gray-700">
                <p className="text-sm mb-3">
                  Found in the <span className="font-semibold">top right corner</span> of the game screen.
                </p>
                <p className="text-sm">
                  Track your skills (empathy, courage, etc.) and your relationships with other characters as they develop.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-bold text-gray-800 mb-3">Quick Tips:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>Your choices shape your character's growth and relationships</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>There are no "wrong" choices—each path teaches you something different</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>Pay attention to the minigames and dialogue—they build your skills</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>Your progress is automatically saved as you play</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold text-lg py-3 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Ready to Play!
          </button>
        </div>
      </div>
    </div>
  );
}

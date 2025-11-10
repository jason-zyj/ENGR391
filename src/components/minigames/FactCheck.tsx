import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useGame } from '../../contexts/GameContext';

interface FactCheckProps {
  onComplete: () => void;
}

const redFlags = [
  { id: 'credentials', label: 'No professional credentials mentioned', found: false },
  { id: 'oversimplify', label: 'Oversimplifies complex mental health issues', found: false },
  { id: 'sources', label: 'No sources or scientific backing', found: false },
  { id: 'promises', label: 'Makes unrealistic promises', found: false },
];

export default function FactCheck({ onComplete }: FactCheckProps) {
  const { updateStat, unlockSkill } = useGame();
  const [foundFlags, setFoundFlags] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleToggleFlag = (flagId: string) => {
    if (foundFlags.includes(flagId)) {
      setFoundFlags(foundFlags.filter((id) => id !== flagId));
    } else {
      setFoundFlags([...foundFlags, flagId]);
    }
  };

  const handleSubmit = () => {
    const allFound = foundFlags.length === redFlags.length;
    setShowFeedback(true);

    if (allFound) {
      updateStat('criticalThinking', 15);
      unlockSkill('fact_checking');
    } else {
      updateStat('criticalThinking', 5);
    }

    setTimeout(onComplete, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Fact Check Challenge</h2>
          <p className="text-gray-600">Find the red flags in this influencer's advice</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
            <div>
              <div className="font-bold text-gray-800">@MindsetGuru</div>
              <div className="text-sm text-gray-500">50K followers</div>
            </div>
          </div>

          <p className="text-lg text-gray-800 mb-4">
            "Feeling anxious? Just choose to be happy! It's all about mindset! 💪✨"
          </p>

          <p className="text-gray-700 mb-4">
            "I cured my anxiety in 3 days with these simple tricks! No therapy needed!
            DM me for my $99 course! 🚀"
          </p>

          <div className="bg-white rounded-lg p-3 text-sm text-gray-600">
            <div className="font-semibold mb-2">About @MindsetGuru:</div>
            <p>"Certified life coach and wellness enthusiast. Here to help you transform your life!"</p>
          </div>
        </div>

        {!showFeedback ? (
          <>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Click all the red flags you can find:</span>
              </div>
              {redFlags.map((flag) => (
                <button
                  key={flag.id}
                  onClick={() => handleToggleFlag(flag.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all border-2 ${
                    foundFlags.includes(flag.id)
                      ? 'bg-red-50 border-red-400'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center border-2 ${
                        foundFlags.includes(flag.id)
                          ? 'bg-red-500 border-red-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {foundFlags.includes(flag.id) && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="text-gray-800">{flag.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={foundFlags.length === 0}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check My Answers
            </button>
          </>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300">
            <div className="text-center mb-4">
              {foundFlags.length === redFlags.length ? (
                <>
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Excellent Work!</h3>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-amber-700 mb-2">Good Start!</h3>
                </>
              )}
            </div>

            <div className="space-y-3 text-gray-800">
              <p className="font-semibold">Red Flags Explained:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>"Certified life coach" is not a mental health professional</li>
                <li>Mental health is complex - there are no 3-day "cures"</li>
                <li>No scientific research or sources cited</li>
                <li>Selling expensive courses instead of recommending real help</li>
              </ul>
              <p className="mt-4 bg-white rounded-lg p-3 border-l-4 border-blue-500">
                <strong>Remember:</strong> Real mental health advice comes from qualified professionals
                like counselors, therapists, and doctors - not social media influencers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

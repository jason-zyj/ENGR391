import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useGame } from '../../contexts/GameContext';

interface ScenarioSortingProps {
  onComplete: () => void;
}

interface Scenario {
  id: string;
  problem: string;
  correctSupport: string;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 'anxiety',
    problem: 'Feeling anxious and can\'t sleep for weeks',
    correctSupport: 'counselor',
    explanation: 'Ongoing mental health concerns need professional support.',
  },
  {
    id: 'math',
    problem: 'Falling behind in math class',
    correctSupport: 'teacher',
    explanation: 'Academic help is best handled by teachers.',
  },
  {
    id: 'bullying',
    problem: 'Being bullied at school',
    correctSupport: 'counselor',
    explanation: 'Bullying is serious and needs adult intervention from a counselor.',
  },
  {
    id: 'friend_harm',
    problem: 'Friend mentions self-harm',
    correctSupport: 'crisis',
    explanation: 'Safety concerns require immediate professional help.',
  },
];

const supportOptions = [
  { id: 'friend', label: 'Friend', color: 'bg-amber-500' },
  { id: 'teacher', label: 'Teacher', color: 'bg-green-500' },
  { id: 'counselor', label: 'Counselor', color: 'bg-cyan-500' },
  { id: 'parent', label: 'Parent', color: 'bg-pink-500' },
  { id: 'crisis', label: '988 Crisis Line', color: 'bg-red-500' },
];

export default function ScenarioSorting({ onComplete }: ScenarioSortingProps) {
  const { updateStat, unlockSkill } = useGame();
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleMatch = (scenarioId: string, supportId: string) => {
    setMatches((prev) => ({
      ...prev,
      [scenarioId]: supportId,
    }));
  };

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    let correct = 0;

    scenarios.forEach((scenario) => {
      const isCorrect = matches[scenario.id] === scenario.correctSupport;
      newResults[scenario.id] = isCorrect;
      if (isCorrect) correct++;
    });

    setResults(newResults);
    setShowFeedback(true);

    if (correct === scenarios.length) {
      updateStat('criticalThinking', 15);
      unlockSkill('match_problem_to_support');
    } else {
      updateStat('criticalThinking', 5);
    }

    setTimeout(onComplete, 4000);
  };

  const allMatched = Object.keys(matches).length === scenarios.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Support Network Map</h2>
          <p className="text-gray-600">Match each problem to the best source of support</p>
        </div>

        {!showFeedback ? (
          <>
            <div className="mb-8 flex flex-wrap gap-3 justify-center">
              {supportOptions.map((option) => (
                <div
                  key={option.id}
                  className={`${option.color} text-white px-4 py-2 rounded-lg font-semibold shadow-lg`}
                >
                  {option.label}
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <p className="text-gray-800 font-medium mb-3">{scenario.problem}</p>
                  <div className="flex flex-wrap gap-2">
                    {supportOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleMatch(scenario.id, option.id)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          matches[scenario.id] === option.id
                            ? `${option.color} text-white shadow-lg scale-105`
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!allMatched}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check My Answers
            </button>
          </>
        ) : (
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`rounded-xl p-4 border-2 ${
                  results[scenario.id]
                    ? 'bg-green-50 border-green-400'
                    : 'bg-amber-50 border-amber-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {results[scenario.id] ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-amber-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-1">{scenario.problem}</p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Best support:</span>{' '}
                      {supportOptions.find((o) => o.id === scenario.correctSupport)?.label}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{scenario.explanation}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300 mt-6">
              <p className="text-gray-800 font-semibold mb-2">Remember:</p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Friends are great for everyday support, but some problems need professionals</li>
                <li>Teachers can help with academic issues</li>
                <li>Counselors are trained for mental health and serious school problems</li>
                <li>Parents/guardians are important for major decisions and ongoing support</li>
                <li>Crisis lines (988) are for immediate safety concerns</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

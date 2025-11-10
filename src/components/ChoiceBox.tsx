import { Choice } from '../types/game';
import { ChevronRight } from 'lucide-react';

interface ChoiceBoxProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export default function ChoiceBox({ choices, onSelect }: ChoiceBoxProps) {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {choices.map((choice, index) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice)}
          className="w-full bg-white hover:bg-blue-50 text-left p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-400 group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg text-gray-800 font-medium pr-4">{choice.text}</span>
            <ChevronRight className="w-6 h-6 text-blue-500 group-hover:translate-x-2 transition-transform" />
          </div>
        </button>
      ))}
    </div>
  );
}

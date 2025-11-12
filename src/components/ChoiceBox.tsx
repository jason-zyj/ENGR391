import { Choice } from '../types/game';
import { ChevronRight } from 'lucide-react';

interface ChoiceBoxProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export default function ChoiceBox({ choices, onSelect }: ChoiceBoxProps) {
  return (
    <div className="space-y-2 sm:space-y-3 w-full max-w-[1040px] mx-auto px-6 sm:px-7 md:px-8">
      {choices.map((choice, index) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice)}
          className="w-full bg-white hover:bg-blue-50 text-left p-3 sm:p-4 md:p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-400 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px]"
          style={{ animationDelay: `${index * 100}ms` }}
          tabIndex={0}
        >
          <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg text-gray-800 font-medium pr-3 sm:pr-4">{choice.text}</span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:translate-x-2 transition-transform flex-shrink-0" />
          </div>
        </button>
      ))}
    </div>
  );
}

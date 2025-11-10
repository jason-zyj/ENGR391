import { useState } from 'react';
import { User, Palette, Shirt } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

interface CharacterCreatorProps {
  onComplete: () => void;
}

const skinTones = [
  { id: 'light', color: '#FFDAB9', label: 'Light' },
  { id: 'medium', color: '#DEB887', label: 'Medium' },
  { id: 'tan', color: '#D2B48C', label: 'Tan' },
  { id: 'brown', color: '#8B4513', label: 'Brown' },
  { id: 'dark', color: '#654321', label: 'Dark' },
];

const hairStyles = [
  { id: 'short', label: 'Short' },
  { id: 'medium', label: 'Medium' },
  { id: 'long', label: 'Long' },
  { id: 'curly', label: 'Curly' },
  { id: 'braids', label: 'Braids' },
];

const hairColors = [
  { id: 'black', color: '#000000', label: 'Black' },
  { id: 'brown', color: '#8B4513', label: 'Brown' },
  { id: 'blonde', color: '#F0E68C', label: 'Blonde' },
  { id: 'red', color: '#DC143C', label: 'Red' },
  { id: 'blue', color: '#4169E1', label: 'Blue' },
  { id: 'purple', color: '#9370DB', label: 'Purple' },
];

const outfits = [
  { id: 'casual', label: 'Casual' },
  { id: 'sporty', label: 'Sporty' },
  { id: 'preppy', label: 'Preppy' },
  { id: 'alternative', label: 'Alternative' },
];

export default function CharacterCreator({ onComplete }: CharacterCreatorProps) {
  const { updatePlayer } = useGame();
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState<'he/him' | 'she/her' | 'they/them'>('they/them');
  const [skinTone, setSkinTone] = useState('light');
  const [hairStyle, setHairStyle] = useState('short');
  const [hairColor, setHairColor] = useState('brown');
  const [outfit, setOutfit] = useState('casual');

  const handleCreate = () => {
    if (!name.trim()) {
      alert('Please enter a name for your character!');
      return;
    }

    updatePlayer({
      name: name.trim(),
      pronouns,
      appearance: {
        skinTone,
        hairStyle,
        hairColor,
        outfit,
      },
    });

    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Your Character</h1>
          <p className="text-gray-600">This is your story. Make it yours!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <User className="w-5 h-5" />
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your character's name"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg"
                maxLength={20}
              />
            </div>

            <div>
              <label className="text-lg font-semibold text-gray-700 mb-3 block">
                Pronouns
              </label>
              <div className="flex gap-3">
                {(['he/him', 'she/her', 'they/them'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPronouns(p)}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      pronouns === p
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <Palette className="w-5 h-5" />
                Skin Tone
              </label>
              <div className="flex gap-3 flex-wrap">
                {skinTones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSkinTone(tone.id)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      skinTone === tone.id
                        ? 'border-blue-500 scale-110 shadow-lg'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: tone.color }}
                    title={tone.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-lg font-semibold text-gray-700 mb-3 block">
                Hair Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {hairStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setHairStyle(style.id)}
                    className={`py-2 px-3 rounded-lg font-medium transition-all ${
                      hairStyle === style.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-lg font-semibold text-gray-700 mb-3 block">
                Hair Color
              </label>
              <div className="grid grid-cols-3 gap-3">
                {hairColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setHairColor(color.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      hairColor === color.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.color }}
                    />
                    <span className="text-sm font-medium">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <Shirt className="w-5 h-5" />
                Outfit Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                {outfits.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setOutfit(o.id)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      outfit === o.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-2">Preview</h3>
              <div className="text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Name:</span> {name || '(Not set)'}
                </p>
                <p>
                  <span className="font-medium">Pronouns:</span> {pronouns}
                </p>
                <p>
                  <span className="font-medium">Style:</span>{' '}
                  {hairStyles.find((s) => s.id === hairStyle)?.label}{' '}
                  {hairColors.find((c) => c.id === hairColor)?.label} hair,{' '}
                  {outfits.find((o) => o.id === outfit)?.label.toLowerCase()} outfit
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCreate}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xl py-4 px-12 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start My Journey
          </button>
        </div>
      </div>
    </div>
  );
}

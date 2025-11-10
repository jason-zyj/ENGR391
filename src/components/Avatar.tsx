interface AvatarProps {
  name: string;
  appearance: {
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    outfit: string;
  };
}

const colorMap: Record<string, string> = {
  light: '#FFDAB9',
  medium: '#DEB887',
  tan: '#D2B48C',
  brown: '#8B4513',
  dark: '#654321',
  black: '#000000',
  blonde: '#F0E68C',
  red: '#DC143C',
  blue: '#4169E1',
  purple: '#9370DB',
};

const outfitColors: Record<string, string> = {
  casual: '#5B9BD5',
  sporty: '#70AD47',
  preppy: '#FFC7CE',
  alternative: '#4A4A4A',
};

export default function Avatar({ name, appearance }: AvatarProps) {
  const skinColor = colorMap[appearance.skinTone] || '#DEB887';
  const hairColor = colorMap[appearance.hairColor] || '#8B4513';
  const outfitColor = outfitColors[appearance.outfit] || '#5B9BD5';

  const renderHair = () => {
    const baseProps = { fill: hairColor };

    switch (appearance.hairStyle) {
      case 'short':
        return (
          <>
            <path d="M 80 50 Q 100 20 120 50" {...baseProps} />
            <path d="M 80 50 L 80 70" {...baseProps} strokeWidth="8" stroke={hairColor} fill="none" />
            <path d="M 120 50 L 120 70" {...baseProps} strokeWidth="8" stroke={hairColor} fill="none" />
          </>
        );
      case 'medium':
        return (
          <>
            <path d="M 75 50 Q 100 15 125 50" {...baseProps} />
            <path d="M 75 50 L 75 90" {...baseProps} strokeWidth="10" stroke={hairColor} fill="none" />
            <path d="M 125 50 L 125 90" {...baseProps} strokeWidth="10" stroke={hairColor} fill="none" />
          </>
        );
      case 'long':
        return (
          <>
            <path d="M 70 50 Q 100 10 130 50" {...baseProps} />
            <path d="M 70 50 L 70 130" {...baseProps} strokeWidth="12" stroke={hairColor} fill="none" />
            <path d="M 130 50 L 130 130" {...baseProps} strokeWidth="12" stroke={hairColor} fill="none" />
          </>
        );
      case 'curly':
        return (
          <>
            <path d="M 75 50 Q 100 15 125 50" {...baseProps} />
            <circle cx="80" cy="60" r="6" {...baseProps} />
            <circle cx="85" cy="55" r="6" {...baseProps} />
            <circle cx="90" cy="65" r="6" {...baseProps} />
            <circle cx="110" cy="65" r="6" {...baseProps} />
            <circle cx="115" cy="55" r="6" {...baseProps} />
            <circle cx="120" cy="60" r="6" {...baseProps} />
          </>
        );
      case 'braids':
        return (
          <>
            <path d="M 75 50 Q 100 15 125 50" {...baseProps} />
            <path d="M 75 50 Q 70 90 75 130" {...baseProps} strokeWidth="8" stroke={hairColor} fill="none" />
            <path d="M 100 50 L 100 130" {...baseProps} strokeWidth="8" stroke={hairColor} fill="none" />
            <path d="M 125 50 Q 130 90 125 130" {...baseProps} strokeWidth="8" stroke={hairColor} fill="none" />
          </>
        );
      default:
        return null;
    }
  };

  const renderOutfit = () => {
    switch (appearance.outfit) {
      case 'casual':
        return (
          <ellipse cx="100" cy="130" rx="35" ry="50" fill={outfitColor} />
        );
      case 'sporty':
        return (
          <>
            <rect x="70" y="110" width="60" height="50" fill={outfitColor} rx="5" />
            <line x1="85" y1="110" x2="85" y2="160" stroke="#fff" strokeWidth="2" />
            <line x1="115" y1="110" x2="115" y2="160" stroke="#fff" strokeWidth="2" />
          </>
        );
      case 'preppy':
        return (
          <>
            <rect x="70" y="110" width="60" height="50" fill={outfitColor} rx="3" />
            <line x1="65" y1="130" x2="135" y2="130" stroke="#fff" strokeWidth="2" />
          </>
        );
      case 'alternative':
        return (
          <>
            <path d="M 70 110 L 100 100 L 130 110 L 130 160 L 70 160 Z" fill={outfitColor} />
            <circle cx="80" cy="125" r="4" fill="#fff" />
            <circle cx="120" cy="125" r="4" fill="#fff" />
          </>
        );
      default:
        return <ellipse cx="100" cy="130" rx="35" ry="50" fill={outfitColor} />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <svg width="200" height="280" viewBox="0 0 200 280" className="drop-shadow-lg">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f0f4f8', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e8eef5', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <rect width="200" height="280" fill="url(#bgGradient)" />

        <circle cx="100" cy="80" r="40" fill={skinColor} />

        <circle cx="92" cy="75" r="4" fill="#000" />
        <circle cx="108" cy="75" r="4" fill="#000" />

        <path d="M 95 85 Q 100 90 105 85" stroke="#000" strokeWidth="2" fill="none" />

        <circle cx="85" cy="85" r="3" fill="#DC143C" />
        <circle cx="115" cy="85" r="3" fill="#DC143C" />

        {renderHair()}

        {renderOutfit()}

        <ellipse cx="75" cy="120" rx="12" ry="35" fill={skinColor} />
        <ellipse cx="125" cy="120" rx="12" ry="35" fill={skinColor} />

        <rect x="65" y="160" width="12" height="50" fill={skinColor} />
        <rect x="123" y="160" width="12" height="50" fill={skinColor} />
      </svg>
    </div>
  );
}

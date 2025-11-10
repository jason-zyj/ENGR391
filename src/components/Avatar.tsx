import BoringAvatar from 'boring-avatars';

interface AvatarProps {
  name: string;
  appearance: {
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    outfit: string;
  };
}

const variantMap: Record<string, 'pixel' | 'bauhaus' | 'ring' | 'beam' | 'sunset' | 'marble' | 'geometric' | 'abstract'> = {
  short: 'pixel',
  medium: 'beam',
  long: 'marble',
  curly: 'sunset',
  braids: 'ring',
};

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

export default function Avatar({ name, appearance }: AvatarProps) {
  const variant = variantMap[appearance.hairStyle] || 'beam';
  const colors = [
    colorMap[appearance.skinTone] || '#DEB887',
    colorMap[appearance.hairColor] || '#8B4513',
    '#ffffff',
    '#cccccc',
    '#666666',
  ];

  return (
    <div className="flex items-center justify-center">
      <BoringAvatar
        size={200}
        name={name || 'Character'}
        variant={variant}
        colors={colors}
      />
    </div>
  );
}

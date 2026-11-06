import React, { useState } from 'react';

interface CatProps {
  className?: string;
  size?: number;
  interactive?: boolean;
  onPet?: () => void;
  bubbleText?: string;
}

export const SleepingCurledCat: React.FC<CatProps> = ({
  className = '',
  size = 120,
  interactive = true,
  onPet,
  bubbleText = "Zzz... 100% cozy"
}) => {
  const [purring, setPurring] = useState(false);

  const handleClick = () => {
    setPurring(true);
    if (onPet) onPet();
    setTimeout(() => setPurring(false), 2400);
  };

  return (
    <div
      onClick={interactive ? handleClick : undefined}
      className={`relative inline-block ${interactive ? 'cursor-pointer group' : ''} ${className}`}
      title={interactive ? "Click to gently pet the sleeping cat" : undefined}
    >
      {purring && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#F3EBDD] border border-[#A9C9DD] px-2.5 py-1 rounded-full text-xs font-script text-[#3D5366] shadow-md animate-bounce z-20">
          purrrr... {bubbleText}
        </div>
      )}

      <svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ${purring ? 'scale-105' : 'group-hover:scale-102'}`}
      >
        {/* Sleeping curled body */}
        <ellipse cx="60" cy="55" rx="42" ry="26" fill="#E8DDD0" stroke="#C9BBAA" strokeWidth="1.5" />
        {/* Soft ginger / calico patches */}
        <path d="M40 38 C 55 35 65 42 70 52 C 60 56 45 52 40 38" fill="#D8AEB9" opacity="0.6" />
        <path d="M72 45 C 85 48 92 60 88 68 C 80 68 74 58 72 45" fill="#A9C9DD" opacity="0.5" />

        {/* Head tucked in */}
        <ellipse cx="36" cy="54" rx="20" ry="18" fill="#EDE4D8" stroke="#C9BBAA" strokeWidth="1.5" />
        
        {/* Sleeping Ears */}
        <path d="M22 42 L 18 30 L 30 36 Z" fill="#D8AEB9" stroke="#C9BBAA" strokeWidth="1.2" />
        <path d="M38 37 L 44 26 L 50 38 Z" fill="#E8DDD0" stroke="#C9BBAA" strokeWidth="1.2" />
        <path d="M24 38 L 22 34 L 28 37 Z" fill="#F4E9ED" />

        {/* Closed happy eyes (sweet arcs) */}
        <path d="M26 52 Q 29 55 32 52" stroke="#526D83" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M37 52 Q 40 55 43 52" stroke="#526D83" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        
        {/* Tiny nose & mouth */}
        <path d="M34 57 L 36 57 L 35 58.5 Z" fill="#D8AEB9" />
        <path d="M33 60 Q 35 62 37 60" stroke="#7A685D" strokeWidth="1" strokeLinecap="round" fill="none" />

        {/* Tiny Whiskers */}
        <path d="M22 55 L 14 53" stroke="#9A897E" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M22 58 L 13 58" stroke="#9A897E" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M46 56 L 54 54" stroke="#9A897E" strokeWidth="0.8" strokeLinecap="round" />

        {/* Curled Tail wrapping around */}
        <path
          d="M98 62 C 105 52 104 38 94 36 C 88 35 84 40 88 44 C 92 48 95 56 86 64"
          stroke="#C9BBAA"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700"
        />

        {/* Tiny blue flower tucked behind ear */}
        <g transform="translate(42, 34) scale(0.65)">
          <circle cx="0" cy="0" r="4" fill="#A9C9DD" />
          <circle cx="0" cy="0" r="1.5" fill="#F4D35E" />
        </g>
      </svg>
    </div>
  );
};

export const CuriousSittingCat: React.FC<CatProps> = ({
  className = '',
  size = 110,
  interactive = true,
  onPet,
  bubbleText = "Meow! Looking closely?"
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    if (onPet) onPet();
    setTimeout(() => setClicked(false), 2600);
  };

  return (
    <div
      onClick={interactive ? handleClick : undefined}
      className={`relative inline-block ${interactive ? 'cursor-pointer group' : ''} ${className}`}
      title={interactive ? "Click me!" : undefined}
    >
      {clicked && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#F3EBDD] border border-[#D8AEB9] px-2 py-0.5 rounded-full text-xs font-script text-[#3D5366] shadow-sm z-20">
          {bubbleText}
        </div>
      )}

      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:-translate-y-1"
      >
        {/* Tail gently curving */}
        <path
          d="M65 92 C 82 92 88 78 84 66 C 82 60 76 62 76 66"
          stroke="#2C3843"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Body */}
        <ellipse cx="48" cy="72" rx="26" ry="28" fill="#3D5366" />
        {/* Chest fluff */}
        <path d="M42 56 C 46 64 54 64 58 56 C 54 70 46 70 42 56 Z" fill="#F4EFE6" />

        {/* Head */}
        <circle cx="48" cy="40" r="21" fill="#3D5366" />

        {/* Pointy ears */}
        <path d="M31 30 L 26 12 L 40 22 Z" fill="#3D5366" />
        <path d="M32 26 L 29 16 L 38 22 Z" fill="#D8AEB9" opacity="0.8" />
        <path d="M65 30 L 70 12 L 56 22 Z" fill="#3D5366" />
        <path d="M64 26 L 67 16 L 58 22 Z" fill="#D8AEB9" opacity="0.8" />

        {/* Wide inquisitive green Ghibli-esque eyes */}
        <ellipse cx="40" cy="39" rx="4.5" ry="5.5" fill="#84A98C" />
        <ellipse cx="56" cy="39" rx="4.5" ry="5.5" fill="#84A98C" />
        <ellipse cx="40" cy="39" rx="2" ry="4" fill="#1C2731" />
        <ellipse cx="56" cy="39" rx="2" ry="4" fill="#1C2731" />
        {/* Sparkle highlights in eyes */}
        <circle cx="41.5" cy="37" r="1.2" fill="#FFFFFF" />
        <circle cx="57.5" cy="37" r="1.2" fill="#FFFFFF" />

        {/* Nose & sweet mouth */}
        <polygon points="46,46 50,46 48,48" fill="#D8AEB9" />
        <path d="M45 49 Q 48 51 51 49" stroke="#EAE0D5" strokeWidth="1" strokeLinecap="round" fill="none" />

        {/* Little silk bow collar in dusty rose */}
        <ellipse cx="48" cy="56" rx="4" ry="2.5" fill="#D8AEB9" />
        <path d="M44 56 C 38 52 38 60 44 56" fill="#D8AEB9" />
        <path d="M52 56 C 58 52 58 60 52 56" fill="#D8AEB9" />

        {/* Paws */}
        <ellipse cx="38" cy="95" rx="8" ry="5" fill="#3D5366" />
        <ellipse cx="58" cy="95" rx="8" ry="5" fill="#3D5366" />
      </svg>
    </div>
  );
};

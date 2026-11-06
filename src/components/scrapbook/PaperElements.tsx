import React from 'react';

interface WashiTapeProps {
  color?: 'blue' | 'rose' | 'lilac' | 'gold' | 'ivory';
  className?: string;
  rotation?: number;
  width?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  color = 'blue',
  className = '',
  rotation = 0,
  width = 'w-24'
}) => {
  const colorStyles = {
    blue: 'bg-[#A9C9DD]/75 border-l-2 border-r-2 border-dashed border-[#8CAEC3]',
    rose: 'bg-[#D8AEB9]/75 border-l-2 border-r-2 border-dashed border-[#BF919C]',
    lilac: 'bg-[#B9B1D1]/75 border-l-2 border-r-2 border-dashed border-[#9E95B8]',
    gold: 'bg-[#E5C992]/75 border-l-2 border-r-2 border-dashed border-[#CBB078]',
    ivory: 'bg-[#F4ECE1]/85 border-l-2 border-r-2 border-dashed border-[#DDD2C2]',
  };

  return (
    <div
      className={`h-4.5 ${width} ${colorStyles[color]} shadow-xs backdrop-blur-xs select-none pointer-events-none z-10 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
};

export const WaxSeal: React.FC<{
  size?: number;
  className?: string;
  initial?: string;
  onClick?: () => void;
  interactive?: boolean;
}> = ({
  size = 52,
  className = '',
  initial = '❤',
  onClick,
  interactive = false
}) => {
  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative rounded-full bg-gradient-to-br from-[#B34045] via-[#8C272C] to-[#5C1619] shadow-md flex items-center justify-center border border-[#7D2125] select-none ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      } ${className}`}
    >
      {/* Outer irregular dripping ring */}
      <div className="absolute inset-0.5 rounded-full border border-[#D97D81]/40" />
      {/* Embossed inner circle */}
      <div className="w-3/4 h-3/4 rounded-full bg-[#7A2024] shadow-inner flex items-center justify-center border border-[#A63C41]">
        <span className="text-[#F5D5C6] font-storybook text-sm font-semibold select-none drop-shadow-xs">
          {initial}
        </span>
      </div>
    </div>
  );
};

export const PostageStamp: React.FC<{
  title?: string;
  price?: string;
  date?: string;
  className?: string;
  accentColor?: string;
  children?: React.ReactNode;
}> = ({
  title = "SPECIAL DELIVERY",
  price = "100%",
  date = "JUNE 2026",
  className = "",
  accentColor = "#A9C9DD",
  children
}) => {
  return (
    <div
      className={`relative bg-[#FAF6EE] p-2.5 rounded-xs border-2 border-dashed border-[#C5B8A5] shadow-sm flex flex-col items-center justify-between ${className}`}
      style={{
        backgroundClip: 'padding-box',
      }}
    >
      {/* Top Header */}
      <div className="w-full flex justify-between items-center text-[9px] font-mono tracking-widest text-[#526D83] uppercase mb-1">
        <span>{title}</span>
        <span className="font-bold text-[#8C272C]">{price}</span>
      </div>

      {/* Center Art or Slot */}
      <div className="w-full min-h-16 bg-[#F0EAE1] rounded-xs border border-[#DFD5C6] flex items-center justify-center p-2 overflow-hidden my-1">
        {children || (
          <div className="text-center font-storybook italic text-xs text-[#526D83]">
            {date}
          </div>
        )}
      </div>

      {/* Postmark cancellation stamp overlay */}
      <div className="w-full flex justify-between items-center text-[8px] font-mono text-[#8C7E72] mt-0.5">
        <span>AIR MAIL</span>
        <span className="tracking-tighter">PAR AVION</span>
      </div>

      {/* Postmark ink rings */}
      <div className="absolute -top-2 -right-2 pointer-events-none opacity-40">
        <svg width="45" height="45" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" stroke="#526D83" strokeWidth="1" fill="none" strokeDasharray="3 2" />
          <line x1="0" y1="20" x2="50" y2="20" stroke="#526D83" strokeWidth="0.8" />
          <line x1="0" y1="30" x2="50" y2="30" stroke="#526D83" strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
};

export const PushPin: React.FC<{
  color?: string;
  className?: string;
}> = ({ color = "#A9C9DD", className = "" }) => {
  return (
    <div className={`relative w-4 h-4 select-none pointer-events-none drop-shadow-sm ${className}`}>
      <div
        className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-inner"
        style={{ backgroundColor: color }}
      />
      <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/70" />
      <div className="w-0.5 h-2 bg-gray-400 mx-auto -mt-0.5 shadow-xs" />
    </div>
  );
};

import React from 'react';

interface FlowerProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export const HydrangeaCluster: React.FC<FlowerProps> = ({ className = '', size = 120, opacity = 1 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none drop-shadow-sm ${className}`}
      style={{ opacity }}
    >
      {/* Stem and soft green leaves */}
      <path d="M50 95 C 48 75 42 60 48 45" stroke="#7A907C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 68 C 30 65 24 55 20 50 C 30 48 42 56 46 64" fill="#8FA491" opacity="0.8" />
      <path d="M49 58 C 65 52 72 45 78 38 C 70 48 58 55 49 58" fill="#7A907C" opacity="0.8" />
      
      {/* Clustered petals in shades of powder blue, deep ink and lavender */}
      <g opacity="0.95">
        {/* Outer petals */}
        <ellipse cx="38" cy="30" rx="9" ry="8" fill="#A9C9DD" opacity="0.9" />
        <ellipse cx="48" cy="22" rx="9" ry="8" fill="#90B7CE" opacity="0.85" />
        <ellipse cx="62" cy="28" rx="8" ry="9" fill="#B9B1D1" opacity="0.8" />
        <ellipse cx="66" cy="42" rx="9" ry="8" fill="#88ADC7" opacity="0.9" />
        <ellipse cx="56" cy="52" rx="9" ry="9" fill="#A9C9DD" opacity="0.85" />
        <ellipse cx="40" cy="48" rx="8" ry="8" fill="#7EA5C0" opacity="0.9" />
        <ellipse cx="30" cy="40" rx="8" ry="7" fill="#B4CEE0" opacity="0.85" />

        {/* Center blossoms */}
        <circle cx="50" cy="36" r="8" fill="#84AEC9" />
        <circle cx="48" cy="35" r="2" fill="#FAF4EB" />
        <circle cx="38" cy="29" r="1.5" fill="#FAF4EB" />
        <circle cx="62" cy="27" r="1.5" fill="#FAF4EB" />
        <circle cx="66" cy="41" r="1.5" fill="#FAF4EB" />
        <circle cx="40" cy="47" r="1.5" fill="#FAF4EB" />
        <circle cx="56" cy="51" r="1.5" fill="#FAF4EB" />
      </g>
    </svg>
  );
};

export const ForgetMeNot: React.FC<FlowerProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none drop-shadow-xs ${className}`}
    >
      <g transform="translate(25, 25)">
        {[0, 72, 144, 216, 288].map((angle, idx) => (
          <path
            key={idx}
            d="M0 0 C -6 -12 -8 -16 0 -18 C 8 -16 6 -12 0 0"
            fill="#A9C9DD"
            stroke="#87ADC4"
            strokeWidth="0.5"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Center yellow-gold star */}
        <circle cx="0" cy="0" r="3.5" fill="#F4D35E" />
        <circle cx="0" cy="0" r="1.5" fill="#E29578" />
      </g>
    </svg>
  );
};

export const PressedCornflower: React.FC<FlowerProps> = ({ className = '', size = 70 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
    >
      <path d="M30 55 L30 32" stroke="#68806A" strokeWidth="1.8" strokeLinecap="round" />
      <g transform="translate(30, 24)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <path
            key={i}
            d="M 0 0 L -3 -16 L 0 -19 L 3 -16 Z"
            fill={i % 2 === 0 ? "#526D83" : "#728FA6"}
            transform={`rotate(${deg}) scale(${i % 3 === 0 ? 0.9 : 1.1})`}
            opacity="0.85"
          />
        ))}
        <circle cx="0" cy="0" r="5" fill="#3D5366" />
        <circle cx="0" cy="0" r="2.5" fill="#D8AEB9" />
      </g>
    </svg>
  );
};

export const FloatingPetals: React.FC<{ count?: number; className?: string }> = ({ count = 6, className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            top: `${10 + (i * 15) % 80}%`,
            left: `${8 + (i * 18) % 85}%`,
            transform: `rotate(${i * 45}deg)`,
            opacity: 0.5 + (i % 3) * 0.15,
            transition: 'all 3s ease-in-out',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2 C 5 8 4 14 10 18 C 16 14 15 8 10 2 Z"
              fill={i % 2 === 0 ? "#A9C9DD" : "#D8AEB9"}
              opacity="0.75"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

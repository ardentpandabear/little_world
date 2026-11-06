import React, { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

type Base = {
  visible?: boolean;
  speed?: number;
  style?: CSSProperties;
  className?: string;
};

const pos = (s?: CSSProperties): CSSProperties => ({
  position: 'absolute',
  pointerEvents: 'none',
  ...s
});

export const FloatingFlower: React.FC<Base & { size?: number }> = ({
  visible = true,
  speed = 1,
  size = 40,
  style,
  className
}) => {
  if (!visible) return null;
  return (
    <svg
      className={`hve-float ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="-20 -20 40 40"
      style={{ ...pos(style), animationDuration: `${4 / speed}s` }}
    >
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cy="-9"
          rx="5"
          ry="10"
          fill="#6d9be0"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="4" fill="#f6efe0" />
    </svg>
  );
};

export const FallingPetals: React.FC<Base & { count?: number }> = ({
  visible = true,
  speed = 1,
  count = 10,
  style,
  className
}) => {
  if (!visible) return null;
  return (
    <div
      className={className}
      style={{ ...pos(style), inset: 0, overflow: 'hidden' }}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="hve-fall"
          style={{
            left: `${(i * 97) % 100}%`,
            fontSize: 14 + (i % 3) * 4,
            animationDuration: `${(9 + (i % 4) * 2) / speed}s`,
            animationDelay: `-${i * 1.3}s`
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
};

export const FloatingCat: React.FC<Base & { width?: number; height?: number }> = ({
  visible = true,
  speed = 1,
  width = 70,
  height = 60,
  style,
  className
}) => {
  if (!visible) return null;
  return (
    <svg
      className={`hve-float ${className ?? ''}`}
      width={width}
      height={height}
      viewBox="-30 -35 70 60"
      style={{ ...pos(style), animationDuration: `${3 / speed}s` }}
      fill="#1b2a4a"
    >
      <ellipse rx="22" ry="14" />
      <circle cx="20" cy="-12" r="11" />
      <path d="M12-20l3-12 6 9zM22-21l7-10 2 12z" />
      <path
        className="hve-tail"
        d="M-20 0q-22-4-18-26"
        stroke="#1b2a4a"
        strokeWidth="5"
        fill="none"
      />
    </svg>
  );
};

export const SparkleField: React.FC<Base & { count?: number; color?: string }> = ({
  visible = true,
  speed = 1,
  count = 14,
  color = '#c3b4dc',
  style,
  className
}) => {
  if (!visible) return null;
  return (
    <div
      className={className}
      style={{ ...pos(style), inset: 0, overflow: 'hidden' }}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="hve-twinkle"
          style={{
            position: 'absolute',
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            color,
            animationDuration: `${(1.5 + (i % 4) * 0.5) / speed}s`
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
};

export const DecorativeButterfly: React.FC<Base & { size?: number }> = ({
  visible = true,
  speed = 1,
  size = 34,
  style,
  className
}) => {
  if (!visible) return null;
  const h = Math.round((size / 34) * 28);
  return (
    <motion.svg
      className={className}
      width={size}
      height={h}
      viewBox="-17 -14 34 28"
      style={pos(style)}
      animate={{ x: [0, 60, 20, 80], y: [0, -30, -10, -50] }}
      transition={{
        duration: 14 / speed,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut'
      }}
    >
      <g className="hve-flap">
        <ellipse cx="-8" cy="-3" rx="9" ry="11" fill="#e3b5c0" />
        <ellipse cx="8" cy="-3" rx="9" ry="11" fill="#c3b4dc" />
      </g>
      <rect x="-1" y="-8" width="2" height="16" fill="#1b2a4a" />
    </motion.svg>
  );
};

export const FloatingMusicDecorations: React.FC<Base> = ({
  visible = true,
  speed = 1,
  style,
  className
}) => {
  if (!visible) return null;
  return (
    <div
      className={className}
      style={{ ...pos(style), inset: 0, overflow: 'hidden' }}
    >
      {['♪', '♫', '♩', '♬'].map((n, i) => (
        <span
          key={i}
          className="hve-float"
          style={{
            position: 'absolute',
            left: `${10 + i * 24}%`,
            top: `${20 + i * 15}%`,
            fontSize: 26,
            color: '#e3b5c0',
            animationDuration: `${(3 + i) / speed}s`
          }}
        >
          {n}
        </span>
      ))}
    </div>
  );
};

export const PaperReveal: React.FC<{
  children: ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => (
  <motion.div
    className={className}
    initial={{ clipPath: 'inset(0 100% 0 0)' }}
    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export const HandwrittenText: React.FC<{
  text: string;
  delay?: number;
  className?: string;
}> = ({ text, delay = 0, className }) => (
  <PaperReveal delay={delay} className={className}>
    <span className="hve-hand text-2xl text-[#8C272C]">{text}</span>
  </PaperReveal>
);

export const ScrapbookSticker: React.FC<{
  children: ReactNode;
  rotate?: number;
  color?: string;
  className?: string;
}> = ({ children, rotate = -4, color, className }) => (
  <span
    className={`hve-sticker ${className ?? ''}`}
    style={{ transform: `rotate(${rotate}deg)`, background: color }}
  >
    {children}
  </span>
);

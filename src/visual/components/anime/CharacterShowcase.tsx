import React, { ReactNode, useState, CSSProperties } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ArtImage from '../ArtImage';

export interface CharacterShowcaseProps {
  src?: string;
  name: string;
  subtitle: string;
  background?: string;
  decoration?: ReactNode;
  from?: 'left' | 'right' | 'bottom';
  intensity?: 0 | 1 | 2 | 3;
  imageStyle?: CSSProperties;
  height?: number | string;
  needed?: string;
  burst?: string;
  className?: string;
  showCaption?: boolean;
}

export default function CharacterShowcase({
  src,
  name,
  subtitle,
  background = 'linear-gradient(160deg,#a9cbe8,#c3b4dc)',
  decoration,
  from = 'bottom',
  intensity = 1,
  imageStyle,
  height = 420,
  needed,
  burst = '✦',
  className = '',
  showCaption = true
}: CharacterShowcaseProps) {
  const rm = useReducedMotion();
  const k = rm ? 0 : intensity;
  const { scrollYProgress } = useScroll();
  const py = useTransform(scrollYProgress, [0, 1], [0, -35 * k]);
  const [b, setB] = useState<number[]>([]);

  const init =
    from === 'left'
      ? { x: -160, opacity: 0 }
      : from === 'right'
      ? { x: 160, opacity: 0 }
      : { y: 120, opacity: 0 };

  return (
    <div
      className={`hve hve-char ${className}`}
      style={{ background, height }}
    >
      {/* Background decorations slot */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {decoration}
      </div>

      {/* Interactive Figure with idle breathing and entrance spring */}
      <motion.div
        className="hve-char-fig"
        style={{ y: py }}
        initial={rm ? false : init}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ type: 'spring', stiffness: 60, damping: 16 }}
        onClick={() => setB((a) => [...a, Date.now()].slice(-6))}
        title={`Click ${name} for a burst!`}
      >
        <motion.div
          animate={
            k
              ? {
                  y: [0, -6 * k, 0],
                  rotate: [-0.6 * k, 0.6 * k, -0.6 * k]
                }
              : {}
          }
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArtImage
            src={src}
            alt={name}
            needed={needed ?? `${name} cutout (transparent PNG/WebP)`}
            style={{
              minHeight: 240,
              maxHeight: typeof height === 'number' ? height - 40 : '100%',
              margin: '0 auto',
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))',
              ...imageStyle
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating Sparkle / Icon Bursts on Click */}
      {b.map((id) =>
        [0, 1, 2].map((i) => (
          <motion.span
            key={`${id}-${i}`}
            className="hve-burst"
            initial={{ opacity: 1, left: '50%', top: '60%' }}
            animate={{
              opacity: 0,
              left: `${50 + (i - 1) * 22}%`,
              top: '20%'
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {burst}
          </motion.span>
        ))
      )}

      {/* Dossier Caption Tag */}
      {showCaption && (
        <div className="hve-char-cap">
          <b className="font-storybook text-[#1b2a4a]">{name}</b>
          <span className="font-mono text-[#526D83]">{subtitle}</span>
        </div>
      )}
    </div>
  );
}

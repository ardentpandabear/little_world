import React, { useState, ReactNode } from 'react';

export interface Hotspot {
  x: number;
  y: number;
  note: string;
}

export interface SceneProps {
  animate?: boolean;
  hotspots?: Hotspot[];
  className?: string;
}

const Cloud = ({ y, d, s }: { y: number; d: number; s: number }) => (
  <g transform={`translate(0 ${y}) scale(${s})`}>
    <g
      className="hve-cloud"
      style={{
        animationDuration: `${d}s`,
        animationDelay: `-${d / 2}s`
      }}
    >
      <ellipse rx="60" ry="20" fill="#fff" opacity="0.9" />
      <ellipse cx="-30" cy="-12" rx="30" ry="18" fill="#fff" opacity="0.95" />
      <ellipse cx="25" cy="-16" rx="34" ry="20" fill="#fff" opacity="0.95" />
    </g>
  </g>
);

const Cat = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#1b2a4a">
    <ellipse rx="22" ry="14" />
    <circle cx="20" cy="-12" r="11" />
    <path d="M12 -20l3-12 6 9zM22 -21l7-10 2 12z" />
    <path
      className="hve-tail"
      d="M-20 0q-22-4-18-26"
      stroke="#1b2a4a"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
  </g>
);

function Wrap({
  children,
  hotspots,
  animate = true,
  className = ''
}: {
  children: ReactNode;
  hotspots: Hotspot[];
  animate?: boolean;
  className?: string;
}) {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  return (
    <div
      className={`hve hve-scene ${className}`}
      data-paused={!animate}
    >
      {children}
      {hotspots.map((h, i) => (
        <button
          key={i}
          type="button"
          aria-label="Open hidden note"
          className="hve-spot"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          onClick={() => setActiveNote(h.note)}
          title="Click to discover a hidden note!"
        />
      ))}
      {activeNote && (
        <div
          className="hve-note hve-hand"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveNote(null)}
        >
          <div className="font-script text-xl sm:text-2xl text-[#8C272C] leading-snug">
            {activeNote}
          </div>
          <div className="text-xs font-mono text-[#526D83] mt-2 opacity-80">
            (click anywhere to tuck note away)
          </div>
        </div>
      )}
    </div>
  );
}

export function FlowerGarden({
  animate = true,
  hotspots = [
    { x: 30, y: 72, note: 'A secret note tucked gently under the blue flowers: you make ordinary days feel extraordinary.' }
  ],
  className = ''
}: SceneProps) {
  const fl = Array.from({ length: 26 }, (_, i) => ({
    x: 20 + i * 30 + (i % 3) * 7,
    h: 60 + ((i * 37) % 50),
    d: 3 + (i % 5) * 0.6
  }));

  return (
    <Wrap hotspots={hotspots} animate={animate} className={className}>
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Whimsical Ghibli flower garden with drifting clouds and curious cat"
      >
        <defs>
          <linearGradient id="garden_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fbfe6" />
            <stop offset="100%" stopColor="#f6efe0" />
          </linearGradient>
          <radialGradient id="garden_sun">
            <stop offset="0%" stopColor="#fff6c8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fff6c8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sky & Sun */}
        <rect width="800" height="500" fill="url(#garden_sky)" />
        <circle cx="640" cy="90" r="150" fill="url(#garden_sun)" />

        {/* Drifting Clouds */}
        <Cloud y={80} d={70} s={1.2} />
        <Cloud y={150} d={95} s={0.8} />

        {/* Distant Hills */}
        <path d="M0 300q120-80 250-20t260-30 290 20v230H0z" fill="#a8c6b0" />

        {/* Trees */}
        {[90, 300, 560, 720].map((x, i) => (
          <g key={x}>
            <rect x={x} y={250 - (i % 2) * 10} width="8" height="50" fill="#6b5a6e" />
            <circle cx={x + 4} cy={235 - (i % 2) * 10} r="34" fill="#7fae95" />
          </g>
        ))}

        {/* Foreground Meadow */}
        <path d="M0 360q200-40 400 0t400-10v150H0z" fill="#8fbf9d" />

        {/* Swaying Blue Flowers */}
        {fl.map((f, i) => (
          <g key={i} transform={`translate(${f.x} 470)`}>
            <g
              className="hve-sway"
              style={{
                animationDuration: `${f.d}s`,
                animationDelay: `-${i * 0.3}s`
              }}
            >
              <rect x="-1.5" y={-f.h} width="3" height={f.h} fill="#4f8a6a" />
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx="0"
                  cy={-f.h - 9}
                  rx="5"
                  ry="10"
                  fill={i % 4 ? '#6d9be0' : '#a9cbe8'}
                  transform={`rotate(${a} 0 ${-f.h})`}
                />
              ))}
              <circle cy={-f.h} r="4" fill="#f6efe0" />
            </g>
          </g>
        ))}

        {/* Cat on the Hill */}
        <Cat x={470} y={462} s={1.2} />

        {/* Floating Petals */}
        {Array.from({ length: 7 }, (_, i) => (
          <ellipse
            key={i}
            className="hve-float"
            cx={80 + i * 105}
            cy={200 + ((i * 53) % 160)}
            rx="4"
            ry="2.5"
            fill="#f3c9d4"
            style={{ animationDuration: `${3 + i * 0.4}s` }}
          />
        ))}
      </svg>
    </Wrap>
  );
}

export function CountrysideWorld({
  animate = true,
  hotspots = [
    { x: 65, y: 56, note: 'Someone left the cottage lamp lit for you across the evening hills.' }
  ],
  className = ''
}: SceneProps) {
  return (
    <Wrap hotspots={hotspots} animate={animate} className={className}>
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Dreamy Ghibli countryside cottage with rolling hills and twilight sky"
      >
        <defs>
          <linearGradient id="countryside_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6fa8dc" />
            <stop offset="100%" stopColor="#f3e3d0" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" fill="url(#countryside_sky)" />
        <Cloud y={70} d={80} s={1.3} />
        <Cloud y={140} d={60} s={0.9} />
        <Cloud y={40} d={110} s={0.7} />

        {/* Layered Rolling Hills */}
        <path d="M0 280q150-90 300-10t300-30 200 20v240H0z" fill="#b5cfb0" />
        <path d="M0 350q200-70 400-10t400-20v180H0z" fill="#8fbf9d" />

        {/* Cozy Countryside Cottage */}
        <g transform="translate(500 290)">
          <rect width="90" height="60" fill="#f0e2cc" />
          <path d="M-10 0L45-45 100 0z" fill="#c97b84" />
          <rect x="12" y="20" width="22" height="40" fill="#6b5a6e" />
          <rect x="52" y="16" width="22" height="20" fill="#a9cbe8" />
          <rect x="70" y="-40" width="12" height="30" fill="#8a6f6a" />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              className="hve-smoke"
              cx="76"
              cy="-48"
              r="6"
              fill="#fff"
              style={{ animationDelay: `${i * 1.3}s` }}
            />
          ))}
        </g>

        {/* Foreground Meadow */}
        <path d="M0 420q250-40 500-10t300-20v110H0z" fill="#79ad88" />

        {/* Swaying Trees */}
        {[120, 220, 700].map((x, i) => (
          <g key={x}>
            <rect x={x} y={340 - i * 8} width="8" height="46" fill="#6b5a6e" />
            <circle
              className="hve-sway"
              cx={x + 4}
              cy={325 - i * 8}
              r="32"
              fill="#6fa583"
            />
          </g>
        ))}

        {/* Countryside Cat */}
        <Cat x={330} y={410} s={0.9} />

        {/* Twinkling Evening Fireflies */}
        {Array.from({ length: 6 }, (_, i) => (
          <circle
            key={i}
            className="hve-twinkle"
            cx={40 + i * 140}
            cy={190 + ((i * 47) % 150)}
            r="2.5"
            fill="#fff"
            style={{ animationDuration: `${1.5 + i * 0.3}s` }}
          />
        ))}
      </svg>
    </Wrap>
  );
}

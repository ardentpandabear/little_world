import React, { ReactNode } from 'react';
import ArtImage from '../ArtImage';
export { FloatingMusicDecorations } from '../decorations';

export const AlbumArtworkCard = ({
  src,
  title,
  year,
  tilt = -3,
  className = ''
}: {
  src?: string;
  title: string;
  year?: string;
  tilt?: number;
  className?: string;
}) => (
  <figure
    tabIndex={0}
    className={`hve-album ${className}`}
    style={{ transform: `rotate(${tilt}deg)`, margin: 0 }}
  >
    <i className="hve-tape" />
    <ArtImage
      src={src}
      alt={title}
      needed={`${title} album cover`}
      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '2px' }}
    />
    <div className="hve-album-info">
      <div>
        <b className="font-storybook text-sm">{title}</b>
        {year && <div className="text-xs font-mono opacity-80 mt-0.5">{year}</div>}
      </div>
    </div>
    <figcaption className="hve-hand text-center text-sm text-[#2A3742] pt-2 font-medium">
      {title}
    </figcaption>
  </figure>
);

export const SongVisualCard = ({
  src,
  title,
  artist,
  className = ''
}: {
  src?: string;
  title: string;
  artist: string;
  className?: string;
}) => (
  <div className={`hve-song ${className}`}>
    <ArtImage
      src={src}
      alt={title}
      needed="song art"
      style={{ width: 56, height: 56, minHeight: 0, borderRadius: 8, objectFit: 'cover' }}
    />
    <div className="min-w-0">
      <b className="font-storybook text-base text-[#2A3742] truncate block">{title}</b>
      <small className="text-xs text-[#526D83] font-mono truncate block">{artist}</small>
    </div>
  </div>
);

export const VinylPlayerVisual = ({
  labelSrc,
  spinning = true,
  size = 220,
  className = '',
  title = 'Vinyl Record'
}: {
  labelSrc?: string;
  spinning?: boolean;
  size?: number;
  className?: string;
  title?: string;
}) => (
  <div
    className={`hve-vinyl ${className}`}
    style={{ width: size, height: size }}
    title={title}
  >
    <div className={`hve-disc ${spinning ? 'hve-spin' : ''}`}>
      <div className="hve-label">
        <ArtImage
          src={labelSrc}
          alt="vinyl center label"
          needed="album label"
          style={{ minHeight: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  </div>
);

export const MusicCollage = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`hve-collage ${className}`}>{children}</div>;

export interface Album {
  title: string;
  year?: string;
  src?: string;
}

export const ArtistShowcase = ({
  name,
  photo,
  albums,
  accent = '#e3b5c0',
  featured = false,
  tagline,
  commentary,
  isAudioPlaying = false,
  className = ''
}: {
  name: string;
  photo?: string;
  albums: Album[];
  accent?: string;
  featured?: boolean;
  tagline?: string;
  commentary?: string;
  isAudioPlaying?: boolean;
  className?: string;
}) => (
  <section
    className={`hve rounded-3xl p-5 sm:p-7 shadow-md transition-all ${className}`}
    style={{
      background: `linear-gradient(135deg, ${accent}33, #FAF6EE)`,
      border: featured ? '2px solid #D8AEB9' : '1px solid #D9CDBE'
    }}
  >
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-4 border-b border-[#E5DAC8]">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="relative shrink-0">
          <ArtImage
            src={photo}
            alt={name}
            needed={`${name} photo`}
            style={{
              width: 130,
              height: 165,
              transform: 'rotate(-2deg)',
              borderRadius: 12,
              boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
              objectFit: 'cover'
            }}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h3 className={`font-storybook font-bold text-[#2A3742] ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
              {name}
            </h3>
            {featured && (
              <span className="font-script text-base text-[#8C272C] bg-[#FAF0F2] px-3 py-0.5 rounded-full border border-[#EAC5CE]">
                Crown Favorite ★
              </span>
            )}
          </div>
          {tagline && (
            <p className="text-xs font-mono uppercase tracking-wider text-[#6B7D8D]">
              {tagline}
            </p>
          )}
          {commentary && (
            <p className="text-xs sm:text-sm text-[#475766] max-w-md italic font-serif leading-relaxed">
              "{commentary}"
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-center gap-1">
        <VinylPlayerVisual
          size={featured ? 120 : 96}
          labelSrc={albums[0]?.src}
          spinning={isAudioPlaying}
          title={isAudioPlaying ? 'Spinning with ambient audio' : 'Vinyl player (plays when audio is active)'}
        />
        <span className="text-[10px] font-mono text-[#7A6B5C]">
          {isAudioPlaying ? '♪ Spinning' : 'Vinyl Ready'}
        </span>
      </div>
    </div>

    {/* Albums Collage */}
    <div className="pt-4">
      <div className="text-xs font-mono uppercase text-[#7D8F9F] mb-2 text-center sm:text-left">
        Key Albums in Rotation:
      </div>
      <MusicCollage>
        {albums.map((a, i) => (
          <AlbumArtworkCard
            key={a.title}
            {...a}
            tilt={(i % 2 === 0 ? -3 : 3) * (1 + (i % 3) * 0.3)}
          />
        ))}
      </MusicCollage>
    </div>
  </section>
);

import React, { useState, CSSProperties } from 'react';

export interface ArtImageProps {
  src?: string;
  alt: string;
  needed?: string;
  style?: CSSProperties;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/** Shows image; if src missing or broken shows an editable styled placeholder naming the file needed. */
export default function ArtImage({
  src,
  alt,
  needed,
  style,
  className,
  loading = 'lazy'
}: ArtImageProps) {
  const [bad, setBad] = useState(false);

  if (!src || bad) {
    return (
      <div
        className={`hve-slot ${className ?? ''}`}
        style={style}
        role="img"
        aria-label={alt}
      >
        <span className="font-mono text-xs opacity-75">Image needed:</span>
        <span className="font-serif font-bold text-xs mt-1">{needed ?? alt}</span>
      </div>
    );
  }

  return (
    <img
      className={`hve-img ${className ?? ''}`}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      style={style}
      onError={() => setBad(true)}
    />
  );
}

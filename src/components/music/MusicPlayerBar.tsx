import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { CuratedTrack } from '../../data/music';
import { musicEngine } from '../../utils/audioEngine';
import { VinylPlayerVisual } from '../../visual/components/music';

interface MusicPlayerBarProps {
  tracks: CuratedTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (seconds: number) => void;
  className?: string;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  className = ''
}) => {
  const [volume, setVolume] = useState(musicEngine.getVolume());
  const [isMuted, setIsMuted] = useState(false);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];
  const safeDuration = duration > 0 ? duration : (currentTrack?.durationSec || 180);
  const progress = Math.min(100, Math.max(0, (currentTime / safeDuration) * 100));

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * safeDuration;
    onSeek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    musicEngine.setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      musicEngine.setVolume(volume || 0.7);
    } else {
      setIsMuted(true);
      musicEngine.setVolume(0);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`bg-[#F9F5EE] border border-[#D5C7B5] rounded-2xl p-4 sm:p-5 shadow-lg relative ${className}`}>
      {/* Track Info & Animated Disc Motif */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative shrink-0 flex items-center justify-center">
            <VinylPlayerVisual
              size={54}
              spinning={isPlaying}
              labelSrc={currentTrack?.coverUrl || "/albums/SOUR.jpg"}
              title={isPlaying ? "Vinyl spinning with real MP3 playback" : "Click play to start"}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF0F2] text-[#8C272C] font-semibold">
                Track 0{currentTrackIndex + 1}
              </span>
              <span className="text-xs text-[#6F8293] truncate font-mono">
                {currentTrack?.artist}
              </span>
            </div>
            <h4 className="font-storybook text-lg sm:text-xl font-bold text-[#2C3843] truncate leading-tight mt-0.5">
              {currentTrack?.title}
            </h4>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onPrev}
            className="p-2 rounded-full hover:bg-[#EBE3D7] text-[#526D83] transition-colors cursor-pointer"
            title="Previous track"
            aria-label="Previous track"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={onTogglePlay}
            className="w-12 h-12 rounded-full bg-[#526D83] hover:bg-[#3D5366] text-[#F3EBDD] flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
            title={isPlaying ? "Pause track" : "Play track"}
            aria-label={isPlaying ? "Pause track" : "Play track"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            className="p-2 rounded-full hover:bg-[#EBE3D7] text-[#526D83] transition-colors cursor-pointer"
            title="Next track"
            aria-label="Next track"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume & Mood indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#526D83]">
          <button onClick={toggleMute} className="hover:text-[#2C3843] cursor-pointer">
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-[#526D83] h-1.5 bg-[#DDD3C4] rounded-lg cursor-pointer"
            title="Volume"
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Progress Bar & Timing */}
      <div className="space-y-1">
        <div
          onClick={handleProgressClick}
          className="w-full h-2.5 bg-[#E5DCD0] rounded-full overflow-hidden cursor-pointer relative group"
        >
          <div
            className="h-full bg-gradient-to-r from-[#A9C9DD] via-[#B9B1D1] to-[#D8AEB9] rounded-full transition-all duration-150 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between items-center text-[11px] font-mono text-[#7A6E63]">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[10px] text-[#7A6E63] font-mono">
            {currentTrack?.artist} &bull; {currentTrack?.title}
          </span>
          <span>{formatTime(safeDuration)}</span>
        </div>
      </div>
    </div>
  );
};

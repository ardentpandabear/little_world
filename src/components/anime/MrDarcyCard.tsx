import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Sparkles, Feather } from 'lucide-react';
import { mrDarcyIntro } from '../../data/anime';
import { voiceEngine, VoicePlaybackState } from '../../utils/voiceAudioEngine';
import { WashiTape } from '../scrapbook/PaperElements';

interface MrDarcyCardProps {
  className?: string;
}

export const MrDarcyCard: React.FC<MrDarcyCardProps> = ({ className = '' }) => {
  const [voiceState, setVoiceState] = useState<VoicePlaybackState>(voiceEngine.getState());
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = voiceEngine.subscribe((state) => {
      setVoiceState(state);
    });
    return unsubscribe;
  }, []);

  const isDarcyActive = voiceState.activeId === 'darcy';
  const isDarcyPlaying = isDarcyActive && voiceState.isPlaying;

  const handleToggle = () => {
    voiceEngine.playVoice('darcy', mrDarcyIntro.audioSources);
  };

  const currentImage = mrDarcyIntro.imageCandidates[imageIndex] || mrDarcyIntro.image;

  const handleImageError = () => {
    if (imageIndex + 1 < mrDarcyIntro.imageCandidates.length) {
      setImageIndex(imageIndex + 1);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative bg-[#FAF6EE] border-2 border-[#D8CEBE] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-14 overflow-visible ${className}`}
    >
      {/* Decorative Washi Tapes */}
      <div className="absolute -top-3 left-8 z-20 pointer-events-none">
        <WashiTape color="gold" rotation={-2} width="w-28" />
      </div>
      <div className="absolute -top-3 right-10 z-20 pointer-events-none">
        <WashiTape color="blue" rotation={1.5} width="w-24" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Mr. Darcy Visual Illustration */}
        <div className="md:col-span-4 flex flex-col items-center justify-center relative">
          {/* Subtle Ambient Radial Glow when speaking */}
          <div
            className={`absolute w-44 sm:w-56 h-44 sm:h-56 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
              isDarcyPlaying ? 'bg-[#C89A58]/35 scale-110' : 'bg-[#E5DDD0]/40 scale-95'
            }`}
          />

          <motion.div
            animate={{
              y: isDarcyPlaying ? [0, -6, 0] : [0, -3, 0],
              scale: isDarcyPlaying ? 1.02 : 1
            }}
            transition={{
              duration: isDarcyPlaying ? 2.5 : 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative z-10 flex flex-col items-center cursor-pointer group"
            onClick={handleToggle}
            title={isDarcyPlaying ? 'Pause Mr. Darcy narration' : 'Play Mr. Darcy narration'}
          >
            <div className="relative">
              <img
                src={currentImage}
                alt={mrDarcyIntro.name}
                onError={handleImageError}
                className="max-h-[260px] sm:max-h-[300px] w-auto object-contain drop-shadow-xl select-none transition-transform duration-300 group-hover:scale-103"
                style={{
                  filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.18))'
                }}
              />

              {/* Animated Speaking Waveform Badge over portrait */}
              {isDarcyPlaying && (
                <div className="absolute -bottom-2 inset-x-0 flex items-center justify-center">
                  <div className="bg-[#2A3742]/90 text-white backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-mono flex items-center gap-1.5 shadow-md border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89A58] animate-ping" />
                    <span>Narrating...</span>
                  </div>
                </div>
              )}
            </div>

            <span className="mt-3 font-storybook text-sm font-bold text-[#526D83]">
              {mrDarcyIntro.name}
            </span>
          </motion.div>
        </div>

        {/* Introductory Message & Spoken Audio Controls */}
        <div className="md:col-span-8 space-y-4 text-left z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E3D6C5] pb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EEF5] text-[#476277] text-xs font-mono tracking-widest uppercase">
              <Feather className="w-3.5 h-3.5 text-[#526D83]" />
              <span>A SPOKEN INTRODUCTION &bull; MR. DARCY</span>
            </div>

            {/* Play / Pause Pill Button */}
            <button
              type="button"
              onClick={handleToggle}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                isDarcyPlaying
                  ? 'bg-[#8C272C] text-white shadow-md ring-2 ring-[#8C272C]/30 scale-102'
                  : 'bg-[#526D83] text-[#F3EBDD] hover:bg-[#3D5366] hover:scale-102'
              }`}
              aria-label={isDarcyPlaying ? 'Pause narration' : 'Listen to narration'}
            >
              {isDarcyPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Voice</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                  <span>Listen to Mr. Darcy</span>
                </>
              )}

              {/* Dynamic waveform bars while audio plays */}
              <div className="flex items-end gap-0.5 h-3 ml-1">
                {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-0.5 rounded-full bg-current"
                    animate={
                      isDarcyPlaying
                        ? { height: ['20%', `${h * 100}%`, '30%'] }
                        : { height: '35%' }
                    }
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.12
                    }}
                  />
                ))}
              </div>
            </button>
          </div>

          {/* Time display if active */}
          {isDarcyActive && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#7A6B5C]">
              <Volume2 className="w-3.5 h-3.5 text-[#C89A58]" />
              <span>
                {formatTime(voiceState.currentTime)} / {formatTime(voiceState.duration || 35)}
              </span>
              <span className="text-[11px] text-[#8C272C] font-sans">
                {isDarcyPlaying ? '• Currently reading' : '• Paused'}
              </span>
            </div>
          )}

          {/* The Exact Introductory Text */}
          <div className="space-y-3 font-serif text-[#2C3843] leading-relaxed text-sm sm:text-base bg-[#F8F2E7]/80 p-4 sm:p-5 rounded-2xl border border-[#DFD3C2]">
            {mrDarcyIntro.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={`transition-colors duration-300 ${
                  idx === 0
                    ? 'font-storybook font-bold text-lg sm:text-xl text-[#8C272C] tracking-tight'
                    : idx === mrDarcyIntro.paragraphs.length - 1
                    ? 'font-script text-xl sm:text-2xl text-[#8C272C] pt-1'
                    : 'text-[#3E4D5B]'
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Post-Narration Helpful Hint */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#6A7B8B] pt-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C89A58] shrink-0" />
            <span>
              Click on any character illustration below to hear their message.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

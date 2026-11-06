import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Feather, Wind, Play, Pause, Volume2, MessageSquare } from 'lucide-react';
import { animeCharacters, ghibliScenes, VisualAnimeCharacter } from '../../data/anime';
import { voiceEngine, VoicePlaybackState } from '../../utils/voiceAudioEngine';
import { MrDarcyCard } from '../../components/anime/MrDarcyCard';
import { WashiTape } from '../../components/scrapbook/PaperElements';
import { CuriousSittingCat } from '../../components/illustrations/Cats';
import {
  FloatingFlower,
  FallingPetals,
  DecorativeButterfly,
  ScrapbookSticker
} from '../../visual/components/decorations';

export const AnimeSection: React.FC = () => {
  const [selectedCharId, setSelectedCharId] = useState<string>(animeCharacters[0].id);
  const [activeGhibliIndex, setActiveGhibliIndex] = useState<number>(0);
  const [voiceState, setVoiceState] = useState<VoicePlaybackState>(voiceEngine.getState());

  useEffect(() => {
    const unsubscribe = voiceEngine.subscribe((state) => {
      setVoiceState(state);
    });
    return unsubscribe;
  }, []);

  const selectedChar = animeCharacters.find((c) => c.id === selectedCharId) || animeCharacters[0];
  const isSelectedCharActive = voiceState.activeId === selectedChar.id;
  const isSelectedCharPlaying = isSelectedCharActive && voiceState.isPlaying;

  const handleCharacterClick = (char: VisualAnimeCharacter) => {
    setSelectedCharId(char.id);
    voiceEngine.playVoice(char.id, char.audioSources);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="anime" className="py-16 md:py-24 px-4 max-w-6xl mx-auto relative overflow-x-clip">
      {/* Editorial Section Header */}
      <div className="text-center mb-10 space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2E8] text-[#55735B] text-xs font-mono tracking-widest uppercase">
          <Feather className="w-3.5 h-3.5" />
          <span>HER FICTIONAL UNIVERSE &bull; SPOKEN VOICES & SHOWCASE</span>
        </div>
        <h2 className="font-storybook text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A3742] tracking-tight">
          Visual Character Showcase & Spoken Notes
        </h2>
        <p className="font-script text-xl sm:text-2xl text-[#8C272C] max-w-xl mx-auto leading-tight">
          "A special corner of your favorite characters brought to life, each with a little voice message waiting for you."
        </p>
      </div>

      {/* MR. DARCY INTRODUCTORY NARRATOR */}
      <MrDarcyCard />

      {/* Visual Character Selector Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 relative z-10">
        {animeCharacters.map((char) => {
          const isSelected = char.id === selectedCharId;
          const isCharSpeaking = voiceState.activeId === char.id && voiceState.isPlaying;

          return (
            <button
              key={char.id}
              onClick={() => handleCharacterClick(char)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-[#526D83] text-[#F3EBDD] shadow-md scale-105'
                  : 'bg-[#FAF6EE] text-[#526D83] hover:bg-[#EFE8DD] border border-[#DDD0BD]'
              }`}
            >
              <span>{char.name}</span>
              {isCharSpeaking && (
                <span className="flex items-end gap-0.5 h-2.5">
                  {[0.4, 1, 0.6].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-0.5 rounded-full bg-current"
                      animate={{ height: ['25%', `${h * 100}%`, '25%'] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Featured Break-the-Boundaries Character Stage & Spotlight */}
      <div className="relative bg-[#FAF6EE] border-2 border-[#D8CEBE] rounded-3xl p-6 sm:p-10 shadow-xl mb-16 overflow-visible">
        {/* Decorative Washi Tapes extending over top border */}
        <div className="absolute -top-3 left-10 z-20 pointer-events-none">
          <WashiTape color="blue" rotation={-2} width="w-28" />
        </div>
        <div className="absolute -top-3 right-12 z-20 pointer-events-none">
          <WashiTape color="rose" rotation={1.5} width="w-28" />
        </div>

        {/* Floating background petals and butterflies */}
        <DecorativeButterfly
          size={32}
          style={{ top: '6%', right: '8%', zIndex: 15 }}
        />
        <FloatingFlower
          size={30}
          style={{ bottom: '10%', left: '4%', zIndex: 15 }}
        />

        {/* Featured Cutout Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          {/* Left: Cutout Visual Stage */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Ambient Radial Aura Backdrop */}
            <div
              className={`absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
                isSelectedCharPlaying ? 'opacity-70 scale-110' : 'opacity-40 scale-100'
              }`}
              style={{ backgroundColor: selectedChar.accentColor }}
            />

            {/* Main Character Cutout with subtle floating motion & intentional overflow */}
            <motion.div
              key={selectedChar.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isSelectedCharPlaying ? 1.03 : 1
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => handleCharacterClick(selectedChar)}
              className="relative z-10 flex flex-col items-center justify-center cursor-pointer group"
              title={isSelectedCharPlaying ? 'Click to pause voice' : 'Click to hear character voice'}
            >
              <div className="relative">
                <motion.img
                  animate={{
                    y: isSelectedCharPlaying ? [0, -10, 0] : [0, -6, 0],
                    rotate: [
                      selectedChar.rotation || 0,
                      (selectedChar.rotation || 0) + (isSelectedCharPlaying ? 1.5 : 0.8),
                      selectedChar.rotation || 0
                    ]
                  }}
                  transition={{
                    duration: isSelectedCharPlaying ? 3 : 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  src={selectedChar.image}
                  alt={selectedChar.name}
                  className="max-h-[420px] sm:max-h-[460px] w-auto object-contain drop-shadow-2xl select-none transition-transform duration-300 group-hover:scale-102"
                  style={{
                    filter: isSelectedCharPlaying
                      ? `drop-shadow(0 16px 30px ${selectedChar.accentColor}88)`
                      : 'drop-shadow(0 16px 24px rgba(0,0,0,0.22))'
                  }}
                />

                {/* Subtle overlay badge indicating interactive voice */}
                <div className="absolute -bottom-2 inset-x-0 flex items-center justify-center">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2 shadow-md transition-all ${
                      isSelectedCharPlaying
                        ? 'bg-[#8C272C] text-white ring-2 ring-white/50 scale-105'
                        : 'bg-[#2A3742]/85 text-white backdrop-blur-xs group-hover:bg-[#2A3742]'
                    }`}
                  >
                    {isSelectedCharPlaying ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>Speaking...</span>
                        <div className="flex items-end gap-0.5 h-2.5">
                          {[0.4, 1, 0.7, 0.9].map((h, i) => (
                            <motion.span
                              key={i}
                              className="w-0.5 rounded-full bg-white"
                              animate={{ height: ['20%', `${h * 100}%`, '20%'] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 ml-0.5" />
                        <span>Click to Hear Voice</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Clean Editorial Character Card & Active Speech Bubble */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D5] text-[#526D83] text-xs font-mono tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C89A58]" />
              <span>{selectedChar.series}</span>
            </div>

            <div>
              <h3 className="font-storybook text-4xl sm:text-5xl font-bold text-[#2A3742] tracking-tight leading-tight">
                {selectedChar.name}
              </h3>
              {selectedChar.tag && (
                <div className="font-mono text-sm text-[#8C272C] font-semibold mt-1">
                  {selectedChar.tag}
                </div>
              )}
            </div>

            {/* ELEGANT SPEECH BUBBLE SUBTITLES */}
            <div className="relative bg-[#FFFDF9] border-2 border-[#D8CEBE] rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
              {/* Speech bubble pointer / tail */}
              <div className="hidden lg:block absolute -left-3 top-6 w-3 h-3 bg-[#FFFDF9] border-l-2 border-b-2 border-[#D8CEBE] rotate-45" />

              <div className="flex items-center justify-between border-b border-[#EAE0D1] pb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8C272C] font-semibold uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 text-[#C89A58]" />
                  <span>Spoken Message</span>
                </div>

                {/* Subtitle Audio Controls */}
                <button
                  type="button"
                  onClick={() => handleCharacterClick(selectedChar)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelectedCharPlaying
                      ? 'bg-[#8C272C] text-white shadow-xs'
                      : 'bg-[#EAE2D5] text-[#526D83] hover:bg-[#DDD0BD]'
                  }`}
                  aria-label={isSelectedCharPlaying ? 'Pause character message' : 'Play character message'}
                >
                  {isSelectedCharPlaying ? (
                    <>
                      <Pause className="w-3 h-3" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span>Play Voice</span>
                    </>
                  )}
                </button>
              </div>

              {/* Subtitle Message Text */}
              <p className="font-script text-xl sm:text-2xl text-[#2C3843] leading-snug">
                "{selectedChar.quote}"
              </p>

              {/* Waveform & Time Status Bar */}
              <div className="flex items-center justify-between text-xs font-mono text-[#7D8F9F] pt-1">
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#C89A58]" />
                  <span>
                    {isSelectedCharActive
                      ? `${formatTime(voiceState.currentTime)} / ${formatTime(voiceState.duration || 12)}`
                      : 'Voice ready'}
                  </span>
                </div>

                {isSelectedCharPlaying && (
                  <div className="flex items-end gap-0.5 h-3">
                    {[0.3, 0.8, 0.5, 1, 0.6].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-0.5 rounded-full bg-[#8C272C]"
                        animate={{ height: ['20%', `${h * 100}%`, '20%'] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Character Thumbnails Grid to Switch Quickly */}
            <div className="pt-2 border-t border-[#DFD3C2]">
              <div className="text-xs font-mono uppercase tracking-wider text-[#7A6B5C] mb-2.5">
                Switch & Listen:
              </div>
              <div className="grid grid-cols-5 gap-2">
                {animeCharacters.map((char) => {
                  const isCurrent = char.id === selectedCharId;
                  const isCharPlaying = voiceState.activeId === char.id && voiceState.isPlaying;

                  return (
                    <button
                      key={char.id}
                      onClick={() => handleCharacterClick(char)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-1 flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'border-[#526D83] bg-[#E4EDF3] shadow-md scale-105'
                          : 'border-[#DDD0BD] bg-[#FAF4EA] hover:border-[#8C9BA8] hover:bg-[#F0E8DC]'
                      }`}
                      title={`${char.name} (Click to play voice)`}
                    >
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-full object-contain"
                      />
                      {isCharPlaying && (
                        <div className="absolute inset-0 bg-[#2A3742]/50 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[#C89A58] animate-ping" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Character Collage Wall: All 10 Illustrations Clickable */}
      <div className="mb-20 relative">
        <div className="flex items-center justify-between mb-6 px-2">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8C272C] font-semibold">
              ✦ Interactive Spoken Collection
            </div>
            <h3 className="font-storybook text-2xl sm:text-3xl font-bold text-[#2A3742]">
              The Character Voice Gallery
            </h3>
            <p className="text-xs text-[#6A7B8B] mt-0.5">
              Click any character cutout to hear their voice and view their message.
            </p>
          </div>
          <div className="flex gap-2">
            <ScrapbookSticker rotate={-2} color="#D8AEB9">10 Spoken Voices</ScrapbookSticker>
            <ScrapbookSticker rotate={3} color="#A9C9DD">Interactive</ScrapbookSticker>
          </div>
        </div>

        {/* Dynamic Asymmetric Grid where characters break borders and play audio */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {animeCharacters.map((char, idx) => {
            const isSelected = char.id === selectedCharId;
            const isThisCharSpeaking = voiceState.activeId === char.id && voiceState.isPlaying;
            const rotations = [-2, 3, -1.5, 2, -3, 1.5, -2, 2.5, -1, 3];
            const rot = rotations[idx % rotations.length];

            return (
              <motion.div
                key={char.id}
                onClick={() => handleCharacterClick(char)}
                whileHover={{ y: -8, scale: 1.03 }}
                animate={{
                  scale: isThisCharSpeaking ? 1.04 : 1,
                  y: isThisCharSpeaking ? -6 : 0
                }}
                transition={{ duration: 0.3 }}
                className={`relative bg-[#FAF5EB] rounded-2xl p-3 border shadow-md flex flex-col items-center justify-between cursor-pointer group transition-all select-none ${
                  isThisCharSpeaking
                    ? 'border-[#8C272C] ring-2 ring-[#8C272C] shadow-xl bg-[#FFFDF9]'
                    : isSelected
                    ? 'border-[#526D83] ring-1 ring-[#526D83] shadow-lg'
                    : 'border-[#DDD0BD] hover:border-[#8C9BA8]'
                }`}
                style={{ transform: `rotate(${rot}deg)` }}
                title={`${char.name} — Click to listen`}
              >
                {/* Washi tape on select cards */}
                {idx % 2 === 0 && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <WashiTape color={idx % 4 === 0 ? "rose" : "blue"} rotation={rot * -1} width="w-16" />
                  </div>
                )}

                {/* Character Cutout Container with intentional slight overflow */}
                <div className="relative w-full h-44 sm:h-52 flex items-end justify-center overflow-visible pt-4">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="max-h-full w-auto object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all"
                    style={{
                      transform: `rotate(${rot * 0.4}deg)`
                    }}
                    loading="lazy"
                  />

                  {/* Speaking indicator overlay over cutout */}
                  {isThisCharSpeaking && (
                    <div className="absolute top-2 right-2 bg-[#8C272C] text-white p-1 rounded-full shadow-md z-20 flex items-center justify-center">
                      <Pause className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Card Bottom Label & Speaking Status */}
                <div className="w-full text-center pt-2 pb-1 border-t border-[#E8DEC9] mt-2">
                  <div className="font-storybook font-bold text-sm text-[#2A3742] truncate">
                    {char.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#6A7B8B] truncate flex items-center justify-center gap-1">
                    {isThisCharSpeaking ? (
                      <span className="text-[#8C272C] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C272C] animate-ping" />
                        Speaking...
                      </span>
                    ) : (
                      <span>{char.series}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* STUDIO GHIBLI SECTION */}
      <div className="bg-[#FAF6EE] border-2 border-[#D9CDBE] rounded-3xl p-6 sm:p-10 shadow-xl relative mb-12">
        <div className="absolute -top-3 right-10 z-20 pointer-events-none">
          <WashiTape color="rose" rotation={2} width="w-28" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E3D6C3]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#55735B] uppercase tracking-wider">
              <Wind className="w-4 h-4" />
              <span>STUDIO GHIBLI ATMOSPHERE &bull; ARTWORK ARCHIVE</span>
            </div>
            <h3 className="font-storybook text-3xl sm:text-4xl font-bold text-[#2A3742] tracking-tight mt-1">
              Studio Ghibli Landscapes & Scenery
            </h3>
            <p className="font-script text-xl text-[#8C272C] leading-snug">
              Wandering through coastal horizons, summer meadows, and enchanted pathways.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CuriousSittingCat size={70} bubbleText="Watching Ghibli skies..." />
          </div>
        </div>

        {/* Primary Large Cinematic Scene Showcase */}
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#D5C7B5] shadow-2xl bg-black/10 group">
            <motion.img
              key={ghibliScenes[activeGhibliIndex].id}
              initial={{ opacity: 0.8, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={ghibliScenes[activeGhibliIndex].image}
              alt={ghibliScenes[activeGhibliIndex].title}
              className="w-full max-h-[460px] object-cover sm:object-contain bg-[#1F2E3B] transition-transform duration-700"
            />

            <FallingPetals visible count={6} />

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 flex items-center justify-between text-white">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#A9C9DD]">
                  Scene {activeGhibliIndex + 1} of {ghibliScenes.length}
                </span>
                <h4 className="font-storybook text-xl sm:text-2xl font-bold">
                  {ghibliScenes[activeGhibliIndex].title}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-white/80">
                <Sparkles className="w-3.5 h-3.5 text-[#C89A58]" />
                <span>Original Film Artwork</span>
              </div>
            </div>
          </div>

          {/* Film Strip Gallery */}
          <div className="pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#738494] mb-3">
              Select Film Still to View:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {ghibliScenes.map((scene, idx) => {
                const isActive = idx === activeGhibliIndex;
                return (
                  <button
                    key={scene.id}
                    onClick={() => setActiveGhibliIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all p-1 bg-[#FAF4EA] text-left cursor-pointer ${
                      isActive
                        ? 'border-[#526D83] shadow-md ring-2 ring-[#526D83]/40 scale-102'
                        : 'border-[#DDD0BD] hover:border-[#8C9BA8] hover:bg-[#F0E8DC]'
                    }`}
                  >
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/10 mb-1.5">
                      <img
                        src={scene.image}
                        alt={scene.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[11px] font-storybook font-bold text-[#2A3742] truncate px-1">
                      {scene.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

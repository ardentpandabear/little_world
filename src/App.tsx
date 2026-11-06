/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScrapbookNav } from './components/navigation/ScrapbookNav';
import { OpeningSection } from './sections/Opening/OpeningSection';
import { ObservationsSection } from './sections/Observations/ObservationsSection';
import { MusicSection } from './sections/Music/MusicSection';
import { AnimeSection } from './sections/Anime/AnimeSection';
import { LetterSection } from './sections/Letter/LetterSection';
import { curatedPlaylist } from './data/music';
import { recipientProfile } from './data/recipient';
import { musicEngine } from './utils/audioEngine';
import { Sparkles, ArrowUp, Music } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('opening');
  const [isOpeningExpanded, setIsOpeningExpanded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(curatedPlaylist[0]?.durationSec || 220);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    musicEngine.setPlaylist(curatedPlaylist);
    const unsubscribe = musicEngine.subscribe((state) => {
      setIsMusicPlaying(state.isPlaying);
      setCurrentTime(state.currentTime);
      if (state.duration > 0) {
        setDuration(state.duration);
      }
      setCurrentTrackIndex(state.currentTrackIndex);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Check current active section
      const sectionIds = ['opening', 'observations', 'music', 'anime', 'letter'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'opening') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMusic = () => {
    musicEngine.togglePlay(currentTrackIndex);
  };

  const handleTrackChange = (index: number) => {
    musicEngine.playTrack(index, true);
  };

  const handleSeek = (seconds: number) => {
    musicEngine.seek(seconds);
  };

  const handleOpenWorld = () => {
    setIsOpeningExpanded(true);
    handleNavigate('observations');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1EA] text-[#2C3843] relative selection:bg-[#A9C9DD]/30">
      {/* Top Scrapbook Navigation */}
      <ScrapbookNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
      />

      {/* Main Sections Content */}
      <main className="flex-1 w-full space-y-10 md:space-y-16">
        {/* SECTION A: THE OPENING */}
        <OpeningSection
          onOpenWorld={handleOpenWorld}
          isOpen={isOpeningExpanded}
          onToggleOpen={() => setIsOpeningExpanded(!isOpeningExpanded)}
        />

        {/* SECTION B: THE OBSERVATION ARCHIVE */}
        <ObservationsSection />

        {/* SECTION C: HER MUSICAL FINGERPRINT & SPOTIFY COLLAGE */}
        <MusicSection
          currentTrackIndex={currentTrackIndex}
          onTrackChange={handleTrackChange}
          isMusicPlaying={isMusicPlaying}
          currentTime={currentTime}
          duration={duration}
          onToggleMusic={toggleMusic}
          onSeek={handleSeek}
        />

        {/* SECTION D: HER FICTIONAL UNIVERSE */}
        <AnimeSection />

        {/* SECTION G: THE POEM AND FINAL LETTER */}
        <LetterSection />
      </main>

      {/* Floating Bottom Quick Audio Bar & Scroll to Top */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          className={`h-11 px-3.5 rounded-full shadow-lg border flex items-center gap-2 transition-all backdrop-blur-md cursor-pointer ${
            isMusicPlaying
              ? 'bg-[#FAF0F2] border-[#D8AEB9] text-[#8C272C] animate-pulse'
              : 'bg-[#FAF6EE]/95 border-[#D8CEBE] text-[#526D83] hover:bg-[#F0E8DC]'
          }`}
          title={isMusicPlaying ? 'Pause song' : 'Play song'}
        >
          <Music className="w-4 h-4" />
          <span className="text-xs font-medium font-mono hidden sm:inline">
            {isMusicPlaying ? 'Playing' : 'Play Music'}
          </span>
        </button>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-[#FAF6EE]/95 border border-[#D8CEBE] text-[#526D83] hover:bg-[#F0E8DC] shadow-lg flex items-center justify-center transition-all cursor-pointer"
            title="Return to top"
            aria-label="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Vintage Scrapbook Colophon / Footer */}
      <footer className="w-full bg-[#F0EAE0] border-t border-[#DFD3C2] py-12 px-4 mt-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#7E8F9F]">
            <Sparkles className="w-3.5 h-3.5 text-[#C89A58]" />
            <span>Colophon &bull; Private Keepsake</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C89A58]" />
          </div>

          <div className="font-arabic text-3xl sm:text-4xl text-[#8C272C] pt-1">
            {recipientProfile.specialPhraseArabic}
          </div>
          <p className="font-script text-lg text-[#526D83]">
            "{recipientProfile.specialPhraseTransliteration} — {recipientProfile.specialPhraseMeaning}"
          </p>

          <p className="text-xs sm:text-sm text-[#4E5E6E] max-w-md mx-auto leading-relaxed">
            Every observation, Spotify mosaic tile, and gentle note gathered here is a quiet reminder that you are seen, loved, and appreciated 100 percent.
          </p>

          <div className="pt-4 border-t border-[#D9CCBA] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8C7D6F] gap-2">
            <span>Special Archive Edition</span>
            <span>A Little World of You &bull; Handcrafted with care</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

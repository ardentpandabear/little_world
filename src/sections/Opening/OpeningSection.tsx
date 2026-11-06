import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowDown, BookOpen } from 'lucide-react';
import { HydrangeaCluster, ForgetMeNot, FloatingPetals } from '../../components/illustrations/BlueFlowers';
import { SleepingCurledCat } from '../../components/illustrations/Cats';
import { WashiTape, WaxSeal, PostageStamp } from '../../components/scrapbook/PaperElements';
import { recipientProfile } from '../../data/recipient';
import {
  FloatingFlower,
  DecorativeButterfly,
  PaperReveal,
  ScrapbookSticker
} from '../../visual/components/decorations';

interface OpeningSectionProps {
  onOpenWorld: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const OpeningSection: React.FC<OpeningSectionProps> = ({
  onOpenWorld,
  isOpen,
  onToggleOpen
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleOpenClick = () => {
    if (!isOpen) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#A9C9DD', '#D8AEB9', '#B9B1D1', '#F3EBDD', '#526D83'],
      });
    }
    onToggleOpen();
    setHasInteracted(true);
  };

  return (
    <section id="opening" className="relative min-h-[90vh] py-12 md:py-20 flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Delicate floating background petals */}
      <FloatingPetals count={8} />

      {/* Decorative corner florals & subtle animated accents */}
      <div className="absolute top-2 left-2 md:top-6 md:left-6 opacity-80 pointer-events-none">
        <HydrangeaCluster size={130} />
      </div>
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 opacity-75 pointer-events-none rotate-45">
        <HydrangeaCluster size={110} />
      </div>
      <div className="absolute top-10 right-8 hidden sm:block pointer-events-none">
        <ForgetMeNot size={40} />
      </div>

      {/* Floating Butterfly & Blue Flower Accent */}
      <DecorativeButterfly
        size={36}
        style={{ top: '8%', right: '12%', zIndex: 10 }}
      />
      <FloatingFlower
        size={34}
        style={{ bottom: '10%', left: '8%', zIndex: 10 }}
      />

      {/* Scrapbook Folio Container */}
      <div className="relative w-full max-w-3xl mx-auto">
        {/* Top Washi Tape strips holding the cover */}
        <div className="absolute -top-3 left-12 z-20">
          <WashiTape color="rose" rotation={-3} width="w-28" />
        </div>
        <div className="absolute -top-3 right-16 z-20">
          <WashiTape color="blue" rotation={2} width="w-32" />
        </div>

        {/* The Outer Scrapbook Cover / Folio Card */}
        <div className="relative bg-[#FBF7F0] border-2 border-[#D8CEBE] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl transition-all duration-700">
          
          {/* Folio Header & Postage Stamp */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-[#E8DEC7] pb-8 mb-8">
            <div className="text-center sm:text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2F7] border border-[#C2D7E5] text-[#476277] text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#526D83]" />
                <span>Private Edition &bull; Personal Archive</span>
              </div>
              <h1 className="font-storybook text-4xl sm:text-5xl md:text-6xl font-bold text-[#2A3742] tracking-tight leading-none">
                A Little World of You
              </h1>
              <p className="font-arabic text-2xl text-[#8C272C] pt-1">
                {recipientProfile.specialPhraseArabic}
              </p>
              <p className="text-xs text-[#6B7D8D] font-mono">
                [{recipientProfile.specialPhraseTransliteration} — {recipientProfile.specialPhraseMeaning}]
              </p>
            </div>

            {/* Vintage Postmark Stamp */}
            <div className="shrink-0 rotate-3 hover:rotate-0 transition-transform">
              <PostageStamp
                title="ARCHIVE DEPT."
                price="100%"
                date="EST. JUNE 2026"
                className="w-32"
              >
                <div className="text-center py-1">
                  <div className="font-script text-lg text-[#526D83] leading-tight">
                    For Her
                  </div>
                  <div className="text-[9px] text-[#8C7E72] tracking-widest font-mono">
                    SPECIAL GIFT
                  </div>
                </div>
              </PostageStamp>
            </div>
          </div>

          {/* Sincere Introductory Message */}
          <div className="relative bg-[#FAF5EC] border border-[#E4DAC9] rounded-2xl p-6 sm:p-8 shadow-xs my-6">
            <div className="absolute -top-3 left-6">
              <WashiTape color="lilac" rotation={-1} width="w-24" />
            </div>

            <PaperReveal>
              <div className="space-y-4 text-[#35434F] text-sm sm:text-base leading-relaxed">
                <p className="font-storybook text-xl italic text-[#526D83] border-l-2 border-[#A9C9DD] pl-3">
                  "Not a conventional birthday party, and not an expectation to celebrate in any loud or crowded way."
                </p>
                <p>
                  Just a quiet, handmade corner of the internet built for you. A place that gathers the small, unusual things that make you uniquely who you are: the songs you play until the lyrics live in your bones, the blue flowers you adore, curious cats asleep in sunbeams, and the little observations noticed by someone who has been paying very close attention.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="font-script text-xl text-[#8C272C] leading-tight">
                    Take your time, wander through the pages, and know that you are loved completely—100 percent.
                  </p>
                  <div className="flex gap-2">
                    <ScrapbookSticker rotate={-2} color="#E2EEF5">Private Keepsake</ScrapbookSticker>
                    <ScrapbookSticker rotate={3} color="#F7E9ED">100% For You</ScrapbookSticker>
                  </div>
                </div>
              </div>
            </PaperReveal>

            {/* Curled cat resting quietly in the corner */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-[#EAE0D1] gap-4">
              <div className="flex items-center gap-3">
                <SleepingCurledCat size={95} bubbleText="Purring quietly beside you" />
                <div className="text-xs text-[#708191] italic font-script text-left">
                  <span>(Psst: Click the cat to pet her)</span>
                </div>
              </div>

              {/* Action Button: Open Your Little World */}
              <button
                onClick={handleOpenClick}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#526D83] to-[#3D5366] hover:from-[#43596C] hover:to-[#314352] text-[#F3EBDD] font-medium text-sm sm:text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <BookOpen className="w-4 h-4 text-[#A9C9DD]" />
                <span>{isOpen ? 'Close Scrapbook Folio' : 'Open Your Little World'}</span>
              </button>
            </div>
          </div>

          {/* Unfolded Folio Prologue Note (visible when opened or toggled) */}
          {isOpen && (
            <div className="mt-8 pt-6 border-t-2 border-dashed border-[#DDD0BF] animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-[#FFFDF9] border border-[#E5DAC8] rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <WaxSeal size={44} initial="✦" />
                  <div>
                    <h3 className="font-storybook text-lg font-bold text-[#2A3742]">
                      Folio Unlocked: The Archive Awaits
                    </h3>
                    <p className="text-xs text-[#526D83]">
                      Scroll down to inspect your personal field observations, playlist statistics, and secret garden.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenWorld}
                  className="px-4 py-2 rounded-lg bg-[#EBF2F7] hover:bg-[#DCE9F2] text-[#476277] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>Begin Exploration</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom subtle note */}
          <div className="mt-6 flex items-center justify-center gap-1 text-[11px] text-[#8C9BA8] font-mono">
            <span>Handcrafted with attention to detail</span>
            <span>&bull;</span>
            <span className="text-[#8C272C] font-arabic text-sm">يا حبيب روحي</span>
          </div>
        </div>
      </div>
    </section>
  );
};

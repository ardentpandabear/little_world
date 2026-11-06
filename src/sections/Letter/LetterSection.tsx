import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart, Edit3, Check, RotateCcw } from 'lucide-react';
import { defaultLetterContent, LetterContent } from '../../data/letter';
import { WaxSeal, WashiTape, PostageStamp } from '../../components/scrapbook/PaperElements';
import { HydrangeaCluster, ForgetMeNot } from '../../components/illustrations/BlueFlowers';
import { SleepingCurledCat } from '../../components/illustrations/Cats';
import {
  PaperReveal,
  FloatingFlower,
  SparkleField,
  ScrapbookSticker
} from '../../visual/components/decorations';

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<LetterContent>(defaultLetterContent);
  const [isEditing, setIsEditing] = useState(false);

  // Form state for editing
  const [editPoemTitle, setEditPoemTitle] = useState(content.poemTitle);
  const [editStanzas, setEditStanzas] = useState(
    content.poemStanzas.map((stanza) => stanza.join('\n')).join('\n\n')
  );
  const [editLetterText, setEditLetterText] = useState(
    content.personalLetterParagraphs.join('\n\n')
  );

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#A9C9DD', '#D8AEB9', '#B9B1D1', '#8C272C', '#F3EBDD'],
      });
    }
    setIsOpen(true);
  };

  const handleSaveEdits = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStanzas = editStanzas
      .split('\n\n')
      .map((block) => block.split('\n').filter((l) => l.trim().length > 0));

    const updatedParagraphs = editLetterText
      .split('\n\n')
      .filter((p) => p.trim().length > 0);

    setContent({
      ...content,
      poemTitle: editPoemTitle,
      poemStanzas: updatedStanzas,
      personalLetterParagraphs: updatedParagraphs,
    });
    setIsEditing(false);
  };

  const handleResetDefault = () => {
    setContent(defaultLetterContent);
    setEditPoemTitle(defaultLetterContent.poemTitle);
    setEditStanzas(defaultLetterContent.poemStanzas.map((s) => s.join('\n')).join('\n\n'));
    setEditLetterText(defaultLetterContent.personalLetterParagraphs.join('\n\n'));
    setIsEditing(false);
  };

  return (
    <section id="letter" className="py-20 md:py-28 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#8C272C] text-xs font-mono tracking-widest uppercase">
          <Mail className="w-3.5 h-3.5" />
          <span>THE FINALE &bull; VOL. VI</span>
        </div>
        <h2 className="font-storybook text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A3742] tracking-tight">
          The Poem and Final Letter
        </h2>
        <p className="font-script text-xl sm:text-2xl text-[#8C272C] max-w-xl mx-auto leading-tight">
          "Unsealed in quiet moments, kept for always."
        </p>
      </div>

      {/* The Envelope / Letter Folio Container */}
      <div className="relative">
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-1/4 z-20">
          <WashiTape color="rose" rotation={-2} width="w-28" />
        </div>
        <div className="absolute -top-3 right-1/4 z-20">
          <WashiTape color="blue" rotation={2} width="w-28" />
        </div>

        {!isOpen ? (
          /* Sealed Envelope View */
          <div className="bg-[#FAF5EC] border-2 border-[#D8CEBE] rounded-3xl p-8 sm:p-14 text-center shadow-xl space-y-8 max-w-2xl mx-auto relative overflow-hidden">
            {/* Stamp in upper corner */}
            <div className="absolute top-6 right-6 rotate-3">
              <PostageStamp
                title="SPECIAL AIRMAIL"
                price="100%"
                date="JUNE 2026"
                className="w-28"
              >
                <div className="text-center py-0.5">
                  <span className="font-arabic text-base text-[#8C272C]">روحي</span>
                </div>
              </PostageStamp>
            </div>

            <div className="pt-8 space-y-3">
              <div className="font-arabic text-3xl sm:text-4xl text-[#8C272C]">
                {content.specialMotif}
              </div>
              <p className="text-xs font-mono text-[#6A7B8B] tracking-wider uppercase">
                [{content.specialMotifSub}]
              </p>
              <h3 className="font-storybook text-2xl sm:text-3xl font-bold text-[#2A3742]">
                A Sealed Note For You
              </h3>
              <p className="text-xs sm:text-sm text-[#5D6F7F] max-w-md mx-auto leading-relaxed">
                Click the wax seal below to break the envelope and reveal the poem and personal letter.
              </p>
            </div>

            {/* Clickable Wax Seal */}
            <div className="py-4 flex justify-center">
              <div
                onClick={handleOpenEnvelope}
                className="cursor-pointer group flex flex-col items-center gap-2"
                title="Click to unseal"
              >
                <WaxSeal size={68} initial="❤" interactive={true} />
                <span className="text-xs font-mono text-[#8C272C] group-hover:underline">
                  ✦ Click Seal to Open ✦
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#7A8C9D] italic font-script">
              <span>Carried with love across every mile</span>
            </div>
          </div>
        ) : (
          /* Unsealed & Unfolded Letter View */
          <div className="bg-[#FFFDF9] border-2 border-[#D8CEBE] rounded-3xl p-6 sm:p-12 md:p-16 shadow-2xl relative animate-in fade-in zoom-in-95 duration-700">
            {/* Corner Blue Flowers & Animated Floating Flower Accent */}
            <div className="absolute top-4 left-4 opacity-70 pointer-events-none hidden sm:block">
              <ForgetMeNot size={36} />
            </div>
            <div className="absolute top-4 right-4 opacity-70 pointer-events-none hidden sm:block">
              <ForgetMeNot size={36} />
            </div>
            <FloatingFlower size={30} style={{ top: 18, right: 28 }} />

            {/* Emotional Visual Motif: Ya Habib Roohi Header */}
            <div className="text-center pb-8 border-b border-[#E8DEC7] mb-8 space-y-2">
              <div className="font-arabic text-4xl sm:text-5xl md:text-6xl text-[#8C272C] select-none">
                {content.specialMotif}
              </div>
              <p className="font-script text-lg sm:text-xl text-[#526D83]">
                "{content.specialMotifSub}"
              </p>
              <div className="text-[11px] font-mono text-[#7D8F9F] uppercase tracking-widest">
                Dedicated to {content.recipientName}
              </div>
            </div>

            {/* Creator's Original Poem Section */}
            <PaperReveal>
              <div className="max-w-xl mx-auto my-8 text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#DDD0BC] text-xs font-mono text-[#6A7B8B] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#C89A58]" />
                  <span>The Original Poem</span>
                </div>

                <h3 className="font-storybook text-2xl sm:text-3xl font-bold text-[#2A3742]">
                  {content.poemTitle}
                </h3>

                {/* Poem Stanzas with careful typography and generous spacing */}
                <div className="space-y-6 pt-2">
                  {content.poemStanzas.map((stanza, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      {stanza.map((line, lIdx) => (
                        <p
                          key={lIdx}
                          className="font-storybook text-lg sm:text-xl text-[#33424E] leading-relaxed tracking-wide italic"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </PaperReveal>

            {/* Separator Motif with Blue Petals & Subtle Twinkle */}
            <div className="relative flex items-center justify-center gap-4 my-12 opacity-80 overflow-hidden py-2">
              <SparkleField visible count={6} color="#D8AEB9" style={{ opacity: 0.5 }} />
              <div className="h-px bg-[#D5C7B5] w-20 z-10" />
              <div className="text-xs font-arabic text-[#8C272C] z-10">✦ ✦ ✦</div>
              <div className="h-px bg-[#D5C7B5] w-20 z-10" />
            </div>

            {/* The Separate Personal Letter */}
            <PaperReveal delay={0.2}>
              <div className="max-w-2xl mx-auto space-y-5 text-[#354452] text-sm sm:text-base leading-relaxed">
                <div className="font-script text-2xl text-[#8C272C] leading-none mb-4">
                  Dearest,
                </div>

                {content.personalLetterParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>
                    {para}
                  </p>
                ))}

                {/* Sign-off & Signature */}
                <div className="pt-6 text-right space-y-1">
                  <p className="font-script text-xl text-[#526D83]">
                    {content.signOff}
                  </p>
                  <p className="font-storybook text-2xl font-bold text-[#2A3742]">
                    {content.creatorSignature}
                  </p>
                  <p className="font-arabic text-xl text-[#8C272C] pt-1">
                    يا حبيب روحي
                  </p>
                  <div className="flex justify-end pt-2">
                    <ScrapbookSticker rotate={-2} color="#F7E9ED">Always &bull; 100%</ScrapbookSticker>
                  </div>
                </div>
              </div>
            </PaperReveal>

            {/* Bottom Controls: Edit / Customize for Creator */}
            <div className="mt-12 pt-6 border-t border-[#EAE0D1] flex flex-wrap items-center justify-between gap-3 text-xs text-[#708292]">
              <div className="flex items-center gap-2">
                <SleepingCurledCat size={65} bubbleText="Purrs happily" />
                <span className="font-script text-sm text-[#526D83]">
                  Always 100% in your corner.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3 py-1.5 rounded-lg border border-[#D5C7B5] hover:bg-[#F4ECE1] text-[#526D83] flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Close Editor' : 'Edit Poem & Letter Text'}</span>
                </button>
              </div>
            </div>

            {/* Creator Inline Editor */}
            {isEditing && (
              <form onSubmit={handleSaveEdits} className="mt-6 p-6 bg-[#FAF6EE] rounded-2xl border border-[#D8CEBE] space-y-4 text-left animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="font-storybook text-xl font-bold text-[#2A3742]">
                    Customization Console
                  </h4>
                  <button
                    type="button"
                    onClick={handleResetDefault}
                    className="text-xs text-[#8C272C] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default</span>
                  </button>
                </div>
                <p className="text-xs text-[#5D6F7F]">
                  You can paste your exact poem stanzas (separate stanzas with double line breaks) and personal letter paragraphs here.
                </p>

                <div>
                  <label className="block text-xs font-medium text-[#485968] mb-1">Poem Title</label>
                  <input
                    type="text"
                    value={editPoemTitle}
                    onChange={(e) => setEditPoemTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5C7B5] text-sm text-[#2C3843]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#485968] mb-1">Poem Stanzas (separate stanzas with a blank line)</label>
                  <textarea
                    rows={6}
                    value={editStanzas}
                    onChange={(e) => setEditStanzas(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5C7B5] text-sm text-[#2C3843] font-serif"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#485968] mb-1">Personal Letter Paragraphs</label>
                  <textarea
                    rows={5}
                    value={editLetterText}
                    onChange={(e) => setEditLetterText(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5C7B5] text-sm text-[#2C3843]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#667887] hover:bg-[#EAE0D1]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#526D83] text-[#F3EBDD] hover:bg-[#3E5365] flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply Updates to Letter</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

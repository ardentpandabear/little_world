import React, { useState } from 'react';
import { Droplet, Percent, Smile, Heart, Users, Sparkles, ChevronDown, ChevronUp, Plus, Check } from 'lucide-react';
import { ObservationItem, initialObservations } from '../../data/observations';
import { WashiTape, PushPin } from '../../components/scrapbook/PaperElements';
import { ScrapbookSticker, SparkleField } from '../../visual/components/decorations';

export const ObservationsSection: React.FC = () => {
  const [observations, setObservations] = useState<ObservationItem[]>(initialObservations);
  const [expandedId, setExpandedId] = useState<string | null>(observations[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCommentary, setNewCommentary] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ObservationItem = {
      id: `obs-custom-${Date.now()}`,
      tag: `Field Study No. 0${observations.length + 1}`,
      title: newTitle,
      handwrittenNote: newNote || "Handwritten field annotation",
      observationBody: newBody || "A sweet quirk observed in natural habitat.",
      Commentary: newCommentary || "Another detail that proves how wonderful you are.",
      iconType: 'custom',
      pinColor: '#B9B1D1',
      rotationDeg: (Math.random() * 4 - 2),
      highlightStat: "Noted with love",
      secretReveal: "Keep being your authentic self."
    };

    setObservations([...observations, newItem]);
    setExpandedId(newItem.id);
    setShowAddModal(false);
    setNewTitle('');
    setNewNote('');
    setNewBody('');
    setNewCommentary('');
  };

  const renderIcon = (type: ObservationItem['iconType']) => {
    switch (type) {
      case 'shower':
        return <Droplet className="w-5 h-5 text-[#526D83]" />;
      case 'percent':
        return <Percent className="w-5 h-5 text-[#B87D8A]" />;
      case 'laugh':
        return <Smile className="w-5 h-5 text-[#86759E]" />;
      case 'heart-arabic':
        return <Heart className="w-5 h-5 text-[#8C272C]" />;
      case 'mother':
        return <Users className="w-5 h-5 text-[#6D8A74]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C89A58]" />;
    }
  };

  return (
    <section id="observations" className="py-16 md:py-24 px-4 max-w-5xl mx-auto">
      {/* Section Header with Vintage Research Notebook Motif */}
      <div className="text-center mb-14 space-y-3 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE3D5] text-[#526D83] text-xs font-mono tracking-widest uppercase">
          <span>VOLUME I &bull; EMPIRICAL ARCHIVE</span>
        </div>
        <h2 className="font-storybook text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A3742] tracking-tight">
          An Entirely Unnecessary Study of You
        </h2>
        <p className="font-script text-xl sm:text-2xl text-[#8C272C] max-w-xl mx-auto leading-tight">
          "Documented with mild scientific rigor, high amusement, and endless fondness."
        </p>
        <p className="text-xs sm:text-sm text-[#5D6F7F] max-w-lg mx-auto font-sans">
          A collection of small habits, linguistic signatures, and genuine quirks noticed by someone paying attention to your every move.
        </p>
        <div className="flex justify-center gap-2 pt-1">
          <ScrapbookSticker rotate={-2} color="#EAE3D5">Field Study</ScrapbookSticker>
          <ScrapbookSticker rotate={2} color="#F7E9ED">Noted With Love</ScrapbookSticker>
        </div>
      </div>

      {/* Grid of Annotated Journal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {observations.map((item, index) => {
          const isExpanded = expandedId === item.id;
          const washiColors: ('blue' | 'rose' | 'lilac' | 'gold')[] = ['blue', 'rose', 'lilac', 'gold'];
          const tapeColor = washiColors[index % washiColors.length];

          return (
            <div
              key={item.id}
              className={`relative bg-[#FBF7F0] border border-[#DDD0BD] rounded-2xl p-6 transition-all duration-300 shadow-md ${
                isExpanded ? 'ring-2 ring-[#A9C9DD]/60 paper-shadow-lifted' : 'hover:-translate-y-1'
              }`}
              style={{
                transform: `rotate(${isExpanded ? 0 : item.rotationDeg}deg)`,
              }}
            >
              {/* Pushpin at top center */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20">
                <PushPin color={item.pinColor} />
              </div>

              {/* Tape accents */}
              <div className="absolute top-2 right-4 pointer-events-none opacity-80">
                <WashiTape color={tapeColor} rotation={-2} width="w-16" />
              </div>

              {/* Card Meta & Header */}
              <div className="flex items-center justify-between text-xs text-[#708292] font-mono mb-2 pt-2">
                <span>{item.tag}</span>
                {item.highlightStat && (
                  <span className="font-bold px-2 py-0.5 rounded bg-[#ECE4D8] text-[#2C3843]">
                    {item.highlightStat}
                  </span>
                )}
              </div>

              <div className="flex items-start gap-3 my-2">
                <div className="w-10 h-10 rounded-xl bg-[#EBE3D5] flex items-center justify-center shrink-0 shadow-inner">
                  {renderIcon(item.iconType)}
                </div>
                <div>
                  <h3 className="font-storybook text-xl font-bold text-[#2A3742] leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-script text-base text-[#8C272C] leading-tight">
                    {item.handwrittenNote}
                  </p>
                </div>
              </div>

              {/* Primary Observation Body */}
              <p className="text-sm text-[#435260] mt-3 leading-relaxed">
                {item.observationBody}
              </p>

              {/* Creator Commentary Box (Expandable Fold) */}
              <div className="mt-4 pt-3 border-t border-[#E8DEC9]">
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-[#526D83] hover:text-[#2A3742] transition-colors py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C89A58]" />
                    <span>{isExpanded ? "Fold Research Commentary" : "Unfold Personal Commentary"}</span>
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <div className="mt-3 bg-[#F4EDE2] border-l-3 border-[#8C272C] p-3.5 rounded-r-xl space-y-2 relative overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <SparkleField visible count={4} color="#C89A58" style={{ opacity: 0.6 }} />
                    <p className="text-xs font-mono uppercase tracking-wider text-[#7A6B5F]">
                      Unfiltered Note:
                    </p>
                    <p className="text-sm text-[#313E4A] leading-relaxed italic font-serif">
                      "{item.Commentary}"
                    </p>
                    {item.secretReveal && (
                      <div className="pt-2 border-t border-[#DFD3C2] text-xs font-script text-[#8C272C]">
                        ✦ {item.secretReveal}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Observation Button for Creator */}
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-[#A9C9DD] bg-[#FAF5EC] hover:bg-[#F0E8DC] text-[#526D83] text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Quirky Observation (Editable Archive)</span>
        </button>
      </div>

      {/* Modal for adding custom observation */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF6EE] border-2 border-[#D8CEBE] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="font-storybook text-2xl font-bold text-[#2A3742] mb-1">
              Log a New Field Observation
            </h3>
            <p className="text-xs text-[#5D6F7F] mb-4">
              Add any new habit, funny quirk, or sweet expression you've noticed recently.
            </p>

            <form onSubmit={handleAddObservation} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-medium text-[#485968] mb-1">Observation Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Tea-Steeping Ritual"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5C7B5] text-sm text-[#2C3843] focus:outline-none focus:ring-1 focus:ring-[#526D83]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#485968] mb-1">Handwritten Annotation / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Frequency: Daily at precisely 3:00 PM"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5C7B5] text-sm text-[#2C3843] focus:outline-none focus:ring-1 focus:ring-[#526D83]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#485968] mb-1">What Happens (The Quirk)</label>
                <textarea
                  rows={2}
                  placeholder="Describe the habit or funny moment..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5C7B5] text-sm text-[#2C3843] focus:outline-none focus:ring-1 focus:ring-[#526D83]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#485968] mb-1">Your Personal Commentary</label>
                <textarea
                  rows={2}
                  placeholder="Why this makes you smile or why you adore it..."
                  value={newCommentary}
                  onChange={(e) => setNewCommentary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#D5C7B5] text-sm text-[#2C3843] focus:outline-none focus:ring-1 focus:ring-[#526D83]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DFD3C2]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#667887] hover:bg-[#EAE0D1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#526D83] text-[#F3EBDD] hover:bg-[#3E5365] flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Observation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { BookOpen, Music, Sparkles, Heart, Mail, Menu, X } from 'lucide-react';

interface ScrapbookNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const ScrapbookNav: React.FC<ScrapbookNavProps> = ({
  activeSection,
  onNavigate,
  isMusicPlaying,
  onToggleMusic
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'opening', label: 'Opening', icon: BookOpen },
    { id: 'observations', label: 'Observations', icon: Sparkles },
    { id: 'music', label: 'Music & Mosaic', icon: Music },
    { id: 'anime', label: 'Fictional World', icon: Heart },
    { id: 'letter', label: 'Letter & Poem', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F6F1EA]/90 border-b border-[#E2D8C7] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Brand / Title with Arabic Motif */}
        <button
          onClick={() => handleNavClick('opening')}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#E5EEF5] border border-[#A9C9DD] flex items-center justify-center text-[#526D83] group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4 text-[#526D83]" />
          </div>
          <div>
            <div className="font-storybook text-lg font-bold text-[#2C3843] leading-none tracking-tight">
              A Little World of You
            </div>
            <div className="font-arabic text-xs text-[#8C272C] leading-none mt-0.5">
              يا حبيب روحي
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E4EDF3] text-[#2C3843] shadow-xs font-semibold ring-1 ring-[#A9C9DD]/50'
                    : 'text-[#647585] hover:text-[#2C3843] hover:bg-[#EFE7DC]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#526D83]' : 'text-[#8C9BA8]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side actions: Real Playlist Audio Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMusic}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isMusicPlaying
                ? 'bg-[#FAF0F2] border-[#D8AEB9] text-[#8C272C] animate-pulse'
                : 'bg-[#FAF6EE] border-[#D8CFBF] text-[#526D83] hover:bg-[#EFE8DD]'
            }`}
            title={isMusicPlaying ? "Pause music" : "Play music"}
            aria-label={isMusicPlaying ? "Pause music" : "Play music"}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">
              {isMusicPlaying ? 'Playing' : 'Play Music'}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#526D83] hover:bg-[#EFE7DC] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6EE] border-b border-[#DFD5C6] px-4 py-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#E4EDF3] text-[#2C3843] font-bold'
                      : 'text-[#526D83] hover:bg-[#EFE7DC]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#526D83]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

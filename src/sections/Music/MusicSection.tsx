import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Music,
  Disc,
  Sparkles,
  Headphones,
  Flame,
  Radio,
  Award,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Layers,
  Heart,
  Play,
  Pause
} from 'lucide-react';
import { manualArtistStats, secondaryArtists, curatedPlaylist } from '../../data/music';
import { MusicPlayerBar } from '../../components/music/MusicPlayerBar';
import { WashiTape } from '../../components/scrapbook/PaperElements';
import {
  ArtistShowcase,
  AlbumArtworkCard,
  MusicCollage
} from '../../visual/components/music';
import { ScrapbookSticker } from '../../visual/components/decorations';

interface MusicSectionProps {
  currentTrackIndex: number;
  onTrackChange: (index: number) => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
  currentTime?: number;
  duration?: number;
  onSeek?: (seconds: number) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  currentTrackIndex,
  onTrackChange,
  isMusicPlaying = false,
  onToggleMusic,
  currentTime = 0,
  duration = 0,
  onSeek
}) => {
  const [activeTab, setActiveTab] = useState<'mosaic' | 'artists' | 'ballads' | 'playlist'>('mosaic');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const collageImagePath = '/assets/aistudio/Playlist_Collage_by_Trackify_0dccdad2.png';

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  const handleNext = () => {
    onTrackChange((currentTrackIndex + 1) % curatedPlaylist.length);
  };

  const handlePrev = () => {
    onTrackChange((currentTrackIndex - 1 + curatedPlaylist.length) % curatedPlaylist.length);
  };

  const handleToggle = () => {
    if (onToggleMusic) {
      onToggleMusic();
    }
  };

  const handleSeek = (seconds: number) => {
    if (onSeek) {
      onSeek(seconds);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="music" className="py-16 md:py-24 px-4 max-w-5xl mx-auto relative overflow-x-clip">
      {/* Floating Artist Cutout - Olivia Rodrigo (breaks section boundary on the right) */}
      <motion.div
        className="absolute -right-4 sm:-right-8 top-12 sm:top-6 w-24 sm:w-36 md:w-44 z-20 pointer-events-none drop-shadow-xl select-none"
        animate={{ y: [0, -8, 0], rotate: [2, 0, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/artists/olivia.png"
          alt="Olivia Rodrigo cutout"
          className="w-full h-auto object-contain filter drop-shadow-md"
        />
      </motion.div>

      {/* Floating Artist Cutout - Taylor Swift (breaks section boundary on the bottom left) */}
      <motion.div
        className="absolute -left-4 sm:-left-8 bottom-16 sm:bottom-10 w-24 sm:w-32 md:w-40 z-20 pointer-events-none drop-shadow-xl select-none hidden sm:block"
        animate={{ y: [0, 8, 0], rotate: [-2, 0, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <img
          src="/artists/taylor.png"
          alt="Taylor Swift cutout"
          className="w-full h-auto object-contain filter drop-shadow-md"
        />
      </motion.div>

      {/* Editorial Header */}
      <div className="text-center mb-10 space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EEF5] text-[#476277] text-xs font-mono tracking-widest uppercase">
          <Headphones className="w-3.5 h-3.5" />
          <span>MUSIC ARCHIVE &bull; DISCOGRAPHY</span>
        </div>
        <h2 className="font-storybook text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A3742] tracking-tight">
          The Music Archive
        </h2>
        <p className="font-script text-xl sm:text-2xl text-[#8C272C] max-w-xl mx-auto leading-tight">
          "Curated playlists, artist discographies, and favorite records."
        </p>

        {/* Clear badges */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="bg-[#FAF3E8] border border-[#E3D4C1] px-3.5 py-1 rounded-full text-xs text-[#7A6B5C] font-mono">
            ★ Real Spotify Playlist Mosaic via Trackify
          </span>
          <span className="bg-[#FAF0F2] border border-[#EAC5CE] px-3.5 py-1 rounded-full text-xs text-[#8C272C] font-mono font-medium">
            11 Playable Tracks &bull; Real Audio
          </span>
        </div>
      </div>

      {/* Main Interactive Music Player */}
      <div className="mb-10 relative z-10">
        <div className="relative">
          <div className="absolute -top-3 left-10 z-20">
            <WashiTape color="rose" rotation={-2} width="w-24" />
          </div>
          <MusicPlayerBar
            tracks={curatedPlaylist}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isMusicPlaying}
            currentTime={currentTime}
            duration={duration}
            onTogglePlay={handleToggle}
            onNext={handleNext}
            onPrev={handlePrev}
            onSeek={handleSeek}
          />
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 relative z-10">
        {[
          { id: 'mosaic', label: '✦ Spotify Album Mosaic', icon: Layers },
          { id: 'artists', label: 'Featured Artists', icon: Flame },
          { id: 'ballads', label: 'The Fray & The Script', icon: Heart },
          { id: 'playlist', label: `Tracklist (${curatedPlaylist.length} Songs)`, icon: Radio }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#526D83] text-[#F3EBDD] shadow-sm scale-102 ring-1 ring-[#526D83]'
                  : 'bg-[#FAF6EE] text-[#526D83] hover:bg-[#EFE8DD] border border-[#DDD3C4]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: The Spotify Album Mosaic */}
      {activeTab === 'mosaic' && (
        <div className="bg-[#FAF6EE] border-2 border-[#D9CDBE] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden z-10">
          <div className="absolute -top-3 left-12 z-20">
            <WashiTape color="blue" rotation={-2} width="w-32" />
          </div>
          <div className="absolute -top-3 right-16 z-20">
            <WashiTape color="gold" rotation={1.5} width="w-28" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Album Collage Frame */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative group w-full max-w-md bg-[#FAF4EA] p-3 sm:p-4 rounded-2xl border-2 border-[#D8CEBE] shadow-2xl transition-transform duration-300">
                <div className="absolute -top-2.5 right-6 z-20 pointer-events-none">
                  <WashiTape color="rose" rotation={3} width="w-20" />
                </div>

                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/5 cursor-pointer border border-[#C5B7A5] shadow-inner"
                  title="Click to view full-resolution album mosaic"
                >
                  <img
                    src={collageImagePath}
                    alt="Spotify Playlist Album Mosaic by Trackify"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-[#2C3843]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4" />
                    <span>Click to Zoom & Inspect</span>
                  </div>
                </div>

                <div className="pt-3 pb-1 flex items-center justify-between text-xs font-mono text-[#7D8F9F]">
                  <span className="font-script text-base text-[#8C272C] leading-none">
                    Trackify Spotify Playlist Analysis
                  </span>
                  <span className="text-[10px] tracking-wider uppercase bg-[#EAE2D5] px-2 py-0.5 rounded text-[#526D83]">
                    100+ Albums Mapped
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="mt-3 text-xs font-mono text-[#526D83] hover:text-[#2A3742] flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#8C272C]" />
                <span>Open high-res interactive album viewer</span>
              </button>
            </div>

            {/* Right: Album Overview */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C272C] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C89A58]" />
                <span>Playlist Catalog</span>
              </div>

              <h3 className="font-storybook text-2xl sm:text-3xl font-bold text-[#2A3742] leading-tight">
                Spotify Album Mosaic
              </h3>

              <p className="text-sm text-[#435260] leading-relaxed">
                A visual representation of the albums and singles cataloged in your regular listening rotation, featuring tracks spanning pop-punk, acoustic ballads, R&B, and classic soundtracks.
              </p>

              <div className="p-4 rounded-2xl bg-[#F0EAE1] border border-[#DFD3C2] space-y-2.5">
                <div className="text-xs font-mono font-bold text-[#526D83] uppercase">
                  Featured Genres & Sounds:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Pop-Punk & Anthems",
                    "Acoustic Ballads & Piano",
                    "Vocal Pop & Harmonies",
                    "Classic Soundtracks",
                    "Modern R&B Melodies",
                    "Indie Rock Essentials"
                  ].map((genre) => (
                    <span
                      key={genre}
                      className="text-[11px] font-mono px-2 py-1 rounded-md bg-[#FAF6EE] text-[#485968] border border-[#DDD3C2]"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F9F4EB] border border-[#E3D6C5] flex items-center gap-3">
                <Disc className="w-8 h-8 text-[#526D83] shrink-0" />
                <div className="text-xs text-[#526D83]">
                  <span className="font-semibold block text-[#2A3742]">11 Integrated Full-Length Tracks</span>
                  Select any song in the player above or through the tracklist tab to listen.
                </div>
              </div>
            </div>
          </div>

          {/* Featured Physical Album Keepsakes with tilted polaroids */}
          <div className="mt-10 pt-6 border-t border-[#DFD3C2]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#8C272C] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#C89A58]" />
                  <span>Physical Keepsakes</span>
                </div>
                <h4 className="font-storybook text-2xl font-bold text-[#2A3742]">
                  Key Records from the Discography
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <ScrapbookSticker rotate={-2} color="#D8AEB9">Heavy Rotation</ScrapbookSticker>
                <ScrapbookSticker rotate={2} color="#A9C9DD">Featured Albums</ScrapbookSticker>
              </div>
            </div>

            <MusicCollage>
              <AlbumArtworkCard
                src="/albums/SOUR.jpg"
                title="SOUR"
                year="2021"
                tilt={-2}
              />
              <AlbumArtworkCard
                src="/albums/GUTS.jpg"
                title="GUTS"
                year="2023"
                tilt={3}
              />
              <AlbumArtworkCard
                src="/albums/Lover.jpg"
                title="Lover"
                year="2019"
                tilt={-3}
              />
              <AlbumArtworkCard
                src="/albums/Midnights.jpg"
                title="Midnights"
                year="2022"
                tilt={2}
              />
              <AlbumArtworkCard
                src="/albums/Sweetener.jpg"
                title="Sweetener"
                year="2018"
                tilt={-2}
              />
              <AlbumArtworkCard
                src="/albums/How to Save a Life.jpg"
                title="How to Save a Life"
                year="2005"
                tilt={3}
              />
              <AlbumArtworkCard
                src="/albums/the script.jpg"
                title="The Script"
                year="2008"
                tilt={-1}
              />
            </MusicCollage>
          </div>
        </div>
      )}

      {/* Tab 2: Featured Artists */}
      {activeTab === 'artists' && (
        <div className="space-y-6 relative z-10">
          {/* Artist Stats Gauge */}
          <div className="bg-[#FAF6EE] border border-[#D9CDBE] rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="font-storybook text-2xl font-bold text-[#2A3742] mb-1">
              Top Cataloged Artists
            </h3>
            <p className="text-xs text-[#5D6F7F] mb-6">
              Track frequencies from saved playlists and music archives.
            </p>

            <div className="space-y-6">
              {manualArtistStats.map((artist) => {
                const maxCount = 60;
                const percentage = Math.round((artist.count / maxCount) * 100);
                const isCrown = artist.name === "Olivia Rodrigo";

                return (
                  <div key={artist.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-storybook text-xl font-bold text-[#2C3843]">
                          {artist.name}
                        </span>
                        {isCrown && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#8C272C] text-[10px] font-bold uppercase tracking-wider border border-[#EAC5CE]">
                            <Flame className="w-3 h-3 text-[#B34045]" /> Featured
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-sm font-bold text-[#526D83]">
                        {artist.count} Tracks
                      </span>
                    </div>

                    <div className="w-full h-4 bg-[#ECE4D8] rounded-full overflow-hidden p-0.5 border border-[#DFD5C6]">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: artist.color,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#6F8293]">
                      <span>{artist.notes}</span>
                      <span className="font-script text-[#8C272C]">{artist.iconTag}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Olivia Rodrigo Spotlight */}
          <div className="bg-gradient-to-br from-[#FAF2F4] to-[#FAF6EE] border-2 border-[#E8C5CD] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8C272C] uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Artist Spotlight</span>
                </div>
                <h4 className="font-storybook text-2xl font-bold text-[#2A3742]">
                  Olivia Rodrigo
                </h4>
                <p className="text-sm text-[#475766] max-w-xl leading-relaxed">
                  Defined by raw emotional lyricism, punchy alt-pop hooks, and acoustic vulnerability across SOUR and GUTS.
                </p>
              </div>

              <div className="shrink-0 p-4 bg-white/80 rounded-2xl border border-[#E5CAD2] shadow-xs text-center w-full sm:w-auto">
                <div className="font-storybook text-3xl font-bold text-[#8C272C]">43</div>
                <div className="text-[11px] font-mono text-[#7A6B5C]">Cataloged Tracks</div>
              </div>
            </div>
          </div>

          {/* Discography Showcases */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-[#DFD3C2] pb-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#8C272C] uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#B34045]" />
                  <span>Curated Discography</span>
                </div>
                <h4 className="font-storybook text-2xl font-bold text-[#2A3742]">
                  Featured Albums & Artwork
                </h4>
              </div>
              <span className="text-xs font-mono text-[#7A6B5C] hidden sm:inline">
                {isMusicPlaying ? '♪ Vinyl playing' : 'Interactive audio integrated'}
              </span>
            </div>

            {/* Olivia Rodrigo Showcase */}
            <ArtistShowcase
              featured={true}
              name="Olivia Rodrigo"
              photo="/artists/Olivia Rodrigo.jpg"
              accent="#D8AEB9"
              isAudioPlaying={isMusicPlaying}
              tagline="Unfiltered lyricism & energetic pop-rock arrangements"
              commentary="Featuring standout singles from SOUR, GUTS, and bonus releases."
              albums={[
                { title: 'SOUR', year: '2021', src: '/albums/SOUR.jpg' },
                { title: 'GUTS', year: '2023', src: '/albums/GUTS.jpg' },
                { title: 'Obsessed / Special Single', year: '2023', src: '/albums/you look pretty sad for a girl so in love.jpg' }
              ]}
            />

            {/* Taylor Swift Showcase */}
            <ArtistShowcase
              featured={false}
              name="Taylor Swift"
              photo="/artists/taylor swift.jpg"
              accent="#B9B1D1"
              isAudioPlaying={isMusicPlaying}
              tagline="Narrative songwriting & iconic bridges"
              commentary="Featuring tracks from Lover, Midnights, and re-recorded classics."
              albums={[
                { title: 'Lover', year: '2019', src: '/albums/Lover.jpg' },
                { title: 'Midnights', year: '2022', src: '/albums/Midnights.jpg' },
                { title: 'Fearless (Taylor\'s Version)', year: '2021', src: '/albums/Love taylor swift.jpg' }
              ]}
            />

            {/* Ariana Grande Showcase */}
            <ArtistShowcase
              featured={false}
              name="Ariana Grande"
              photo="/artists/ariana grande.jpg"
              accent="#A9C9DD"
              isAudioPlaying={isMusicPlaying}
              tagline="Layered vocal harmonies & contemporary pop-R&B"
              commentary="Featuring tracks from Sweetener and thank u, next."
              albums={[
                { title: 'Sweetener', year: '2018', src: '/albums/Sweetener.jpg' },
                { title: 'thank u, next', year: '2019', src: '/albums/ariana grande.jpg' }
              ]}
            />
          </div>
        </div>
      )}

      {/* Tab 3: The Fray & The Script */}
      {activeTab === 'ballads' && (
        <div className="space-y-8 relative z-10">
          {/* Bruno Mars Floating Cutout decorative accent */}
          <motion.div
            className="absolute -right-6 -bottom-6 w-28 sm:w-36 z-20 pointer-events-none drop-shadow-xl select-none hidden md:block"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/artists/bruno.png"
              alt="Bruno Mars cutout"
              className="w-full h-auto object-contain filter drop-shadow-md"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryArtists.map((artist, idx) => (
              <div
                key={artist.name}
                className="bg-[#FAF6EE] border border-[#D9CDBE] rounded-3xl p-6 sm:p-8 shadow-md relative"
              >
                <div className="absolute -top-3 left-6">
                  <WashiTape color={idx === 0 ? "blue" : "rose"} rotation={idx === 0 ? -1 : 1.5} width="w-24" />
                </div>
                <div className="text-xs font-mono text-[#7D8E9E] uppercase tracking-wider mb-2">
                  {artist.role}
                </div>
                <h3 className="font-storybook text-2xl font-bold text-[#2A3742] mb-3">
                  {artist.name}
                </h3>
                <p className="text-sm text-[#4E5E6E] leading-relaxed mb-4">
                  {artist.commentary}
                </p>
                <div className="p-3.5 rounded-xl bg-[#F0EAE0] border border-[#DFD3C2] text-xs font-mono text-[#33424E]">
                  Acoustic piano chords, emotional melodies, and narrative songwriting.
                </div>
              </div>
            ))}
          </div>

          {/* Showcases with Album Artwork */}
          <div className="space-y-6">
            <ArtistShowcase
              featured={false}
              name="The Fray"
              photo="/artists/the fray.jpg"
              accent="#A9C9DD"
              isAudioPlaying={isMusicPlaying}
              tagline="Piano-driven rock & reflective ballads"
              commentary="Featuring tracks from How to Save a Life and the self-titled album."
              albums={[
                { title: 'How to Save a Life', year: '2005', src: '/albums/How to Save a Life.jpg' },
                { title: 'The Fray', year: '2009', src: '/albums/the fray.jpg' }
              ]}
            />

            <ArtistShowcase
              featured={false}
              name="The Script"
              accent="#D8AEB9"
              isAudioPlaying={isMusicPlaying}
              tagline="Anthemic pop-rock & storytelling"
              commentary="Featuring tracks from their debut and international catalog."
              albums={[
                { title: 'The Script', year: '2008', src: '/albums/the script.jpg' }
              ]}
            />
          </div>
        </div>
      )}

      {/* Tab 4: Curated Playlist List (All 11 Real MP3 Songs) */}
      {activeTab === 'playlist' && (
        <div className="bg-[#FAF6EE] border border-[#D9CDBE] rounded-3xl p-6 sm:p-8 shadow-md space-y-4 relative z-10">
          {/* Blackpink Floating Cutout decorative accent */}
          <motion.div
            className="absolute -right-5 -top-8 w-24 sm:w-32 z-20 pointer-events-none drop-shadow-xl select-none hidden sm:block"
            animate={{ y: [0, -6, 0], rotate: [1, -1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/artists/blackpink.png"
              alt="Blackpink cutout"
              className="w-full h-auto object-contain filter drop-shadow-md"
            />
          </motion.div>

          <div className="flex items-center justify-between border-b border-[#E3D7C5] pb-4">
            <div>
              <h3 className="font-storybook text-2xl font-bold text-[#2A3742]">
                Audio Tracklist
              </h3>
              <p className="text-xs text-[#5D6F7F]">
                11 real audio tracks available for playback. Click any song to listen.
              </p>
            </div>
            <Radio className="w-5 h-5 text-[#526D83]" />
          </div>

          <div className="space-y-2.5">
            {curatedPlaylist.map((track, idx) => {
              const isSelected = currentTrackIndex === idx;
              const isCurrentlyPlaying = isSelected && isMusicPlaying;

              return (
                <div
                  key={track.id}
                  onClick={() => {
                    if (isSelected) {
                      onToggleMusic?.();
                    } else {
                      onTrackChange(idx);
                    }
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#FAF0F2] border-[#D8AEB9] shadow-sm'
                      : 'bg-[#FDFBF7] border-[#E8DEC9] hover:bg-[#F5EFE4]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-[#E5DDD0] text-xs font-mono font-bold text-[#526D83] flex items-center justify-center shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>

                    {/* Album Art Thumbnail */}
                    <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#D5C9B8] shadow-xs">
                      <img
                        src={track.coverUrl || '/albums/SOUR.jpg'}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-[#2C3843] truncate">
                        {track.title}
                      </h4>
                      <p className="text-xs text-[#7A6B5C] truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-[#8C7E72]">
                      {isSelected ? formatTime(currentTime) + ' / ' + formatTime(duration || track.durationSec) : formatTime(track.durationSec)}
                    </span>

                    <button
                      type="button"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCurrentlyPlaying
                          ? 'bg-[#8C272C] text-white shadow-xs'
                          : 'bg-[#ECE4D8] text-[#526D83] hover:bg-[#DDD3C2]'
                      }`}
                      aria-label={isCurrentlyPlaying ? 'Pause track' : 'Play track'}
                    >
                      {isCurrentlyPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Modal for High-Resolution Album Mosaic Inspection */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl flex items-center justify-between text-white pb-3 border-b border-white/20 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-storybook text-lg font-bold">
                Spotify Album Mosaic &bull; Trackify Analysis
              </span>
              <span className="text-xs font-mono text-[#A9C9DD] hidden sm:inline">
                [{Math.round(zoomLevel * 100)}%]
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
                title="Reset zoom"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                }}
                className="p-2 rounded-lg bg-[#8C272C] hover:bg-[#A32E34] text-white transition-colors cursor-pointer ml-2"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative max-w-4xl max-h-[80vh] overflow-auto rounded-xl flex items-center justify-center p-2">
            <img
              src={collageImagePath}
              alt="Spotify Playlist Album Mosaic Full Zoom"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease-out'
              }}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="text-center pt-3 text-xs font-mono text-white/70">
            Use zoom controls to inspect individual album tiles from the playlist mosaic.
          </div>
        </div>
      )}
    </section>
  );
};

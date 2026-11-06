export interface ManualArtistStat {
  name: string;
  count: number;
  badge: string;
  color: string;
  notes: string;
  iconTag: string;
}

export interface CuratedTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl?: string;
  durationSec: number;
}

export const manualArtistStats: ManualArtistStat[] = [
  {
    name: "Taylor Swift",
    count: 52,
    badge: "52 tracks in rotation",
    color: "#B9B1D1",
    notes: "Storytelling, bridges, and favorites known word-for-word.",
    iconTag: "Cardigan & Midnights"
  },
  {
    name: "Ariana Grande",
    count: 43,
    badge: "43 tracks in rotation",
    color: "#D8AEB9",
    notes: "Signature vocal layering, harmonies, and pop melodies.",
    iconTag: "Sweetener & Cloud Harmonies"
  },
  {
    name: "Olivia Rodrigo",
    count: 43,
    badge: "43 tracks in rotation",
    color: "#A9C9DD",
    notes: "Heavy rotation, raw lyricism, and high-energy anthems.",
    iconTag: "Top Rotation ★"
  }
];

export const secondaryArtists = [
  {
    name: "The Fray",
    role: "Piano Ballads & Deep Melodies",
    commentary: "Introspective piano chords and classic melodies."
  },
  {
    name: "The Script",
    role: "Acoustic Rock & Anthems",
    commentary: "Warm guitar hooks and heartfelt tracks."
  }
];

export const curatedPlaylist: CuratedTrack[] = [
  { 
    id: "track-1",
    title: "Ye Tune Kya Kiya",
    artist: "Javed Bashir",
    audioUrl: "/songs mp3/Ye Tune Kya Kiya - Javed Bashir (Lyrics) _ Lyrical Bam Hindi 4.mp3",
    coverUrl: "/albums/Midnights.jpg",
    durationSec: 314
    
  },
  {
    id: "track-2",
    title: "good 4 u",
    artist: "Olivia Rodrigo",
    audioUrl: "/songs mp3/Olivia Rodrigo - good 4 u (Official Video) 4.mp3",
    coverUrl: "/albums/SOUR.jpg",
    durationSec: 178
  },
  {
    id: "track-3",
    title: "honeybee",
    artist: "Olivia Rodrigo",
    audioUrl: "/songs mp3/Olivia Rodrigo - honeybee (Lyric Video).mp3",
    coverUrl: "/albums/you look pretty sad for a girl so in love.jpg",
    durationSec: 212
  },
  {
    id: "track-4",
    title: "Love Story",
    artist: "Taylor Swift",
    audioUrl: "/songs mp3/Taylor Swift - Love Story 4.mp3",
    coverUrl: "/albums/Love taylor swift.jpg",
    durationSec: 235
  },
  {
    id: "track-5",
    title: "You Belong With Me",
    artist: "Taylor Swift",
    audioUrl: "/songs mp3/Taylor Swift - You Belong With Me 4.mp3",
    coverUrl: "/albums/Love taylor swift.jpg",
    durationSec: 231
  },
  {
    id: "track-6",
    title: "7 rings",
    artist: "Ariana Grande",
    audioUrl: "/songs mp3/Ariana Grande - 7 rings (Official Video) 4.mp3",
    coverUrl: "/albums/ariana grande.jpg",
    durationSec: 178
  },
  {
    id: "track-7",
    title: "positions",
    artist: "Ariana Grande",
    audioUrl: "/songs mp3/Ariana Grande - positions (official video) 4.mp3",
    coverUrl: "/albums/Sweetener.jpg",
    durationSec: 172
  },
  {
    id: "track-8",
    title: "Raindance (ft. Tems)",
    artist: "Dave",
    audioUrl: "/songs mp3/Dave - Raindance (ft. Tems).mp3",
    coverUrl: "/albums/the script.jpg",
    durationSec: 215
  },
  {
    id: "track-9",
    title: "Something About You (ft. Dent May)",
    artist: "Eyedress",
    audioUrl: "/songs mp3/Eyedress - Something About You (Lyrics) ft. Dent May 4.mp3",
    coverUrl: "/albums/How to Save a Life.jpg",
    durationSec: 160
  },
  {
    id: "track-10",
    title: "The Crazy In Your Eyes",
    artist: "lolwtfitsjake",
    audioUrl: "/songs mp3/lolwtfitsjake -The Crazy In Your Eyes.mp3",
    coverUrl: "/albums/the fray.jpg",
    durationSec: 148
  },
  {
    id: "track-11",
    title: "vampire",
    artist: "Olivia Rodrigo",
    audioUrl: "/songs mp3/Olivia Rodrigo - vampire (Official Video) 4.mp3",
    coverUrl: "/albums/GUTS.jpg",
    durationSec: 220
  }
];

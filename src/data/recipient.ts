/**
 * Recipient metadata and creative profile
 * All fields are easily customizable by the creator.
 */

export interface RecipientProfile {
  title: string;
  subtitle: string;
  specialPhraseArabic: string;
  specialPhraseTransliteration: string;
  specialPhraseMeaning: string;
  relationshipStartDate: string;
  firstILoveYouDate: string;
  firstILoveYouTime: string;
  colorPalette: {
    name: string;
    hex: string;
    role: string;
  }[];
  aestheticKeywords: string[];
}

export const recipientProfile: RecipientProfile = {
  title: "A Little World of You",
  subtitle: "A personal scrapbook of small observations, quiet memories, and all your favorite things.",
  specialPhraseArabic: "يا حبيب روحي",
  specialPhraseTransliteration: "Ya habib roohi",
  specialPhraseMeaning: "Beloved of my soul",
  relationshipStartDate: "June 5, 2026",
  firstILoveYouDate: "June 9, 2026",
  firstILoveYouTime: "7:24 PM",
  colorPalette: [
    { name: "Vintage Ivory", hex: "#F3EBDD", role: "Aged paper, warm light, handwritten notes" },
    { name: "Powder Blue", hex: "#A9C9DD", role: "Hydrangeas, forget-me-nots, gentle morning skies" },
    { name: "Dusty Rose", hex: "#D8AEB9", role: "Washi tape, pressed petals, quiet blush" },
    { name: "Muted Lilac", hex: "#B9B1D1", role: "Ribbons, evening shadows, dreamy twilight" },
    { name: "Deep Ink Blue", hex: "#526D83", role: "Fountain pen ink, night sky, delicate linework" },
  ],
  aestheticKeywords: [
    "Blue Flowers",
    "Curious Cats",
    "Studio Ghibli",
    "Girly Pop",
    "Vintage Scrapbooks",
    "Fountain Pen Notes",
    "Warm Tea & Rainy Windows",
    "The Apothecary Diaries",
  ],
};

export interface ObservationItem {
  id: string;
  tag: string;
  title: string;
  handwrittenNote: string;
  observationBody: string;
  Commentary: string;
  iconType: 'shower' | 'percent' | 'laugh' | 'heart-arabic' | 'mother' | 'sparkle' | 'custom';
  pinColor: string;
  rotationDeg: number;
  highlightStat?: string;
  secretReveal?: string;
}

export const initialObservations: ObservationItem[] = [
  {
    id: "obs-shower",
    tag: "Field Study No. 01",
    title: "The 80-Minute Shower Phenomenon",
    handwrittenNote: "Approx. duration recorded across multiple instances: 80.0 min",
    observationBody: "Where does the time go? Does the steam transport you to an alternate dimension? Are you singing to the showerhead or contemplating the mysteries of life? Regardless, the average duration of your showers is a consistent 80 minutes. ",
    Commentary: "IDK how i noticed it, but I do take count of everything you do darling and I found thsi unique quality. It’s uniquely yours and completely endearing.",
    iconType: "shower",
    pinColor: "#A9C9DD",
    rotationDeg: -1.5,
    highlightStat: "80 min",
    secretReveal: "Scientific finding: 10% washing, 90% contemplating life and vocalising high notes."
  },
  {
    id: "obs-hundred-percent",
    tag: "Field Study No. 02",
    title: "The '100 Percent' tag line",
    handwrittenNote: "Frequency: Unrivaled conviction in every reply",
    observationBody: "Not 'maybe', not 'probably', not even 'ninety-nine percent'. Whenever you agree with something or feel it in your bones, you hit it with an immediate, unwavering '100 percent'.",
    Commentary: "There is zero hesitation in your delivery.  Lols You wouldnt have noticed it but i find it CUTE AF. It’s a phrase that carries weight, certainty, and a touch of charm. It’s become a signature of your communication style.",
    iconType: "percent",
    pinColor: "#D8AEB9",
    rotationDeg: 1.8,
    highlightStat: "100%",
    secretReveal: "Confidence rating: absolute, non-negotiable, and adorable."
  },
  {
    id: "obs-laugh",
    tag: "Field Study No. 03",
    title: "How Easily and Brightly You Laugh",
    handwrittenNote: "Acoustic signature: contagious, frequent, entirely unpretentious",
    observationBody: "You laugh quickly, openly, and without measuring whether anyone is watching. Even silly small jokes or unexpected moments turn into genuine, lighthearted laughter.",
    Commentary: "Hearing you laugh is one of those sounds that immediately recalibrates whatever kind of day I was having. It feels effortless and warm, like sunshine breaking through an overcast afternoon.",
    iconType: "laugh",
    pinColor: "#B9B1D1",
    rotationDeg: -2.2,
    highlightStat: "Infinite",
    secretReveal: "Note to self: Keep making terrible jokes if it makes her laugh like that."
  },
  {
    id: "obs-habib-roohi",
    tag: "Field Study No. 04",
    title: "Favourite Expression: 'يا حبيب روحي'",
    handwrittenNote: "Ya habib roohi — Beloved of my soul",
    observationBody: "Softly spoken, carrying a depth of warmth that English expressions never quite capture. When you say this, the world around slows down for a second.",
    Commentary: "It’s one thing to hear affectionate words, but this one carries your voice, your culture, and a quiet tenderness that stays with me long after you've said it.",
    iconType: "heart-arabic",
    pinColor: "#526D83",
    rotationDeg: 1.2,
    highlightStat: "يا حبيب روحي",
    secretReveal: "A phrase that makes a heart feel completely at home."
  },
  {
    id: "obs-mother",
    tag: "Field Study No. 05",
    title: "How Dearly You Love Your Mother",
    handwrittenNote: "Tender loyalty, sweet calls, gentle thoughtfulness",
    observationBody: "The genuine respect, protectiveness, and adoration you have for your mom is one of the most beautiful reflections of who you are at your core.",
    Commentary: "Watching how much you value family and the gentle consideration you show her tells anyone everything they need to know about your gentle, generous heart.",
    iconType: "mother",
    pinColor: "#D8AEB9",
    rotationDeg: -1.0,
    highlightStat: "Heart of Gold",
    secretReveal: "Kindness isn't something you perform; it's simply where you come from."
  }
];

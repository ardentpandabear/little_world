export interface LetterContent {
  recipientName: string;
  openingPlea: string;
  specialMotif: string;
  specialMotifSub: string;
  poemTitle: string;
  poemStanzas: string[][];
  personalLetterParagraphs: string[];
  signOff: string;
  creatorSignature: string;
}

export const defaultLetterContent: LetterContent = {
  recipientName: "My Dearest",
  openingPlea: "For the girl whose presence is like gentle rain after a long dry summer...",
  specialMotif: "يا حبيب روحي",
  specialMotifSub: "Beloved of my soul",
  poemTitle: "As Close as January and December",
  poemStanzas: [
    [
      "Since I cannot kiss you, I shall think of you.",
"Since I cannot touch you, I shall dream of you.",
"And since I cannot come to see you,",
"I shall wait for you.",
    ],
    [
      "Or perhaps, my love,",
"come to me,",
"or take me with you.",
"For what good is a world so wide",
"when all I wish for is to be where you are?",
    ],
    [
      "I'd peel pomegranates for you,",
"carefully, seed by seed,",
"peel oranges with my hands,",
"cut apples into little pieces,",
"and find a thousand little ways",
"to love you in the ordinary.",
    ],
    [
      "For I wish to love you",
"not only in grand declarations,",
"but in the quietest corners of our days.",
"In the meals we share,",
"in the mornings we wake to,",
"in the little things that need no words.",
    ],
    [
      "You are my baby, my girl, my darling,",
"my wife, my moon, my stars, my universe.",
"And perhaps the universe is too small a word,",
"for even it cannot contain",
"all that I feel for you.",
    ],
    [
      "We are as close as January and December,",
"and as far as January and December.",
"Bound by the same calendar,",
"living beneath the same passing sky,",
"yet separated by all the days",
"I wish I could spend beside you.",
    ],
    [
      "And until the day the distance gives way,",
"until the waiting becomes a memory,",
"I will think of you, dream of you,",
"and keep a place for you",
"in every tomorrow.",
    ],
    [
      "For if I cannot be beside you just yet,",
"let me at least spend every day",
"loving you from wherever I am."
    ]
  ],
  personalLetterParagraphs: [
    "I didn't make this because you needed another birthday card or a loud celebration. I made it because I wanted you to have a quiet place that proves, without a doubt, that every little detail about you has been seen, appreciated, and kept safe.",
    "Whenever you feel tired or doubt yourself, come to me love. Remember that someone knows your quirks, adores your laughter, and loves you 100 percent.",
    "Always and completely yours,"
  ],
  signOff: "With all my love,",
  creatorSignature: "Forever yours"
};

export interface VisualAnimeCharacter {
  id: string;
  name: string;
  series: string;
  image: string;
  accentColor: string;
  tag?: string;
  rotation?: number;
  audioSources: string[];
  quote: string;
}

export const animeCharacters: VisualAnimeCharacter[] = [
  {
    id: "char-maomao",
    name: "Maomao",
    series: "The Apothecary Diaries",
    image: "/characters/maomao.png",
    accentColor: "#A9C9DD",
    tag: "Apothecary",
    rotation: -2,
    audioSources: [
      "/audio/anime-characters/maomao.mp3",
      "/audio/maomao.flac",
      "/audio/maomao.mp3"
    ],
    quote: "You seem to have a habit of making people rather fond of you. Quite an unusual condition, actually. I suppose the only prescription is to keep being yourself. And perhaps get enough sleep."
  },
  {
    id: "char-toji",
    name: "Toji Fushiguro",
    series: "Jujutsu Kaisen",
    image: "/characters/toji.png",
    accentColor: "#526D83",
    tag: "Formidable",
    rotation: 2,
    audioSources: [
      "/audio/anime-characters/toji.mp3",
      "/audio/toji.flac",
      "/audio/toji.mp3"
    ],
    quote: "Hey, Sofia. Don't go making life harder for yourself than it needs to be. Take it easy sometimes. Do what makes you happy, keep that smile around, and don't let the world take the good parts of you away."
  },
  {
    id: "char-sakamoto",
    name: "Seiroku Sakamoto",
    series: "Sparks of Tomorrow",
    image: "/characters/sakamoto.png",
    accentColor: "#D8AEB9",
    tag: "Resilience",
    rotation: -1.5,
    audioSources: [
      "/audio/anime-characters/sakamoto.mp3",
      "/audio/sakamoto.flac",
      "/audio/sakamoto.mp3"
    ],
    quote: "There's something special about the way you see the world. I hope you never lose that curiosity, or the little things that make you happy. Keep looking forward. There's still so much waiting for you."
  },
  {
    id: "char-gojo",
    name: "Satoru Gojo",
    series: "Jujutsu Kaisen",
    image: "/characters/gojo.png",
    accentColor: "#7EA2C7",
    tag: "Limitless",
    rotation: 1,
    audioSources: [
      "/audio/anime-characters/gojo.mp3",
      "/audio/gojo.flac",
      "/audio/gojo.mp3"
    ],
    quote: "Someone's clearly got the universe on their side. I mean, look at you! Keep that smile, keep being your ridiculously wonderful self, and don't settle for anything less than extraordinary."
  },
  {
    id: "char-maki",
    name: "Maki Zen'in",
    series: "Jujutsu Kaisen",
    image: "/characters/maki.png",
    accentColor: "#55735B",
    tag: "Unwavering",
    rotation: -2,
    audioSources: [
      "/audio/anime-characters/maki.mp3",
      "/audio/maki.flac",
      "/audio/maki.mp3"
    ],
    quote: "Don't let anyone make you feel like you're less than you are. You've got your own strength, your own way of doing things, and that's more than enough. Keep being unapologetically yourself."
  },
  {
    id: "char-mikasa",
    name: "Mikasa Ackerman",
    series: "Attack on Titan",
    image: "/characters/mikasa.png",
    accentColor: "#8C272C",
    tag: "Devotion",
    rotation: 2,
    audioSources: [
      "/audio/anime-characters/mikasa.mp3",
      "/audio/mikasa.flac",
      "/audio/mikasa.mp3"
    ],
    quote: "You don't have to be strong every single moment. I hope you always have somewhere you feel safe, people who stand by you, and reasons to keep smiling. You deserve that."
  },
  {
    id: "char-nami",
    name: "Nami",
    series: "One Piece",
    image: "/characters/nami.png",
    accentColor: "#C89A58",
    tag: "Navigator",
    rotation: -1,
    audioSources: [
      "/audio/anime-characters/nami.mp3",
      "/audio/nami.flac",
      "/audio/nami.mp3"
    ],
    quote: "Listen, you better be taking care of yourself! Eat properly, get some rest, and don't forget to enjoy the little things. And remember, someone as precious as you deserves all the good things in the world!"
  },
  {
    id: "char-law",
    name: "Trafalgar Law",
    series: "One Piece",
    image: "/characters/law.png",
    accentColor: "#3D5366",
    tag: "Surgeon of Death",
    rotation: 1.5,
    audioSources: [
      "/audio/anime-characters/law.mp3",
      "/audio/law.flac",
      "/audio/law.mp3"
    ],
    quote: "Don't overthink everything. You don't have to figure it all out today. Just keep moving at your own pace, look after yourself, and don't forget that you're more important than you give yourself credit for."
  },
  {
    id: "char-ryuk",
    name: "Ryuk",
    series: "Death Note",
    image: "/characters/ryuk.png",
    accentColor: "#2A3742",
    tag: "Shinigami",
    rotation: -2.5,
    audioSources: [
      "/audio/anime-characters/ryuk.mp3",
      "/audio/ryuk.flac",
      "/audio/ryuk.mp3"
    ],
    quote: "Humans are interesting. But you? You're a little more interesting than most. Try not to lose that peculiar little spark of yours. It would make this world considerably more boring."
  },
  {
    id: "char-yor",
    name: "Yor Forger",
    series: "Spy x Family",
    image: "/characters/YOr.png",
    accentColor: "#B84357",
    tag: "Thorn Princess",
    rotation: 2,
    audioSources: [
      "/audio/anime-characters/yor-forger.mp3",
      "/audio/yor.flac",
      "/audio/yor-forger.mp3",
      "/audio/yor.mp3"
    ],
    quote: "You're a really lovely person, you know that? I hope life is always gentle with you, and that you never run out of little things that make you smile. Please take good care of yourself, okay?"
  }
];

export interface MrDarcyIntroData {
  name: string;
  subtitle: string;
  image: string;
  imageCandidates: string[];
  audioSources: string[];
  paragraphs: string[];
}

export const mrDarcyIntro: MrDarcyIntroData = {
  name: "Mr. Darcy",
  subtitle: "An Spoken Introduction to the Voices",
  image: "/mr darcy/mr darcy image.png",
  imageCandidates: [
    "/mr darcy/mr darcy image.png",
    "/mr darcy/Mr. Darcy.png",
    "/characters/Mr. Darcy.png",
    "/audio/mr-darcy/Mr. Darcy.png"
  ],
  audioSources: [
    "/audio/mr-darcy/mr-darcy.mp3",
    "/mr darcy/mr darcy.flac",
    "/mr darcy/mr-darcy.mp3",
    "/audio/mr-darcy.flac"
  ],
  paragraphs: [
    "A little something I made just for you.",
    "I spent some time experimenting with voice models and audio generation, trying to bring a few of your favourite characters to life in a slightly different way.",
    "I picked out the characters, put together little messages for each of them, generated their voices, and brought everything into this little corner of the website.",
    "They're not official lines or scenes, just something I made for you. A few familiar voices, each with something nice to say.",
    "Go on, give them a listen."
  ]
};

export interface GhibliSceneItem {
  id: string;
  title: string;
  image: string;
  aspect?: string;
}

export const ghibliScenes: GhibliSceneItem[] = [
  {
    id: "scene-coastal",
    title: "Cinematic Coastal Horizon",
    image: "/ghibli/images (4).png",
    aspect: "16/9"
  },
  {
    id: "scene-forest",
    title: "Enchanted Pathway",
    image: "/ghibli/images.png",
    aspect: "3/4"
  },
  {
    id: "scene-town",
    title: "Seaside Village",
    image: "/ghibli/images (1).png",
    aspect: "16/9"
  },
  {
    id: "scene-meadow",
    title: "Summer Meadow",
    image: "/ghibli/images (2).png",
    aspect: "16/9"
  },
  {
    id: "scene-valley",
    title: "Sunlit Valley",
    image: "/ghibli/images (3).png",
    aspect: "16/9"
  }
];

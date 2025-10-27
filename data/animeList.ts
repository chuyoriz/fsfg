export interface Anime {
  id: number;
  title: string;
  poster: string;
  rating: number;
  genre: string[];
  synopsis: string;
  episodes: Episode[];
}

export interface Episode {
  number: number;
  title: string;
  duration: string;
}

export const animeList: Anime[] = [
  {
    id: 1,
    title: "Demon Slayer",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=75&auto=format",
    rating: 9.2,
    genre: ["Action", "Fantasy", "Shounen"],
    synopsis: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.",
    episodes: [
      { number: 1, title: "Cruelty", duration: "24min" },
      { number: 2, title: "Trainer Sakonji Urokodaki", duration: "24min" },
      { number: 3, title: "Sabito and Makomo", duration: "24min" }
    ]
  },
  {
    id: 2,
    title: "Attack on Titan",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=75&auto=format",
    rating: 9.0,
    genre: ["Action", "Drama", "Mystery"],
    synopsis: "Humans are nearly exterminated by giant creatures called Titans. Titans are typically several stories tall.",
    episodes: [
      { number: 1, title: "To You, 2000 Years Later", duration: "25min" },
      { number: 2, title: "That Day", duration: "25min" }
    ]
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&q=75&auto=format",
    rating: 8.8,
    genre: ["Action", "Supernatural", "Shounen"],
    synopsis: "A boy swallows a cursed talisman and becomes cursed himself. He must collect all parts of the demon to save himself.",
    episodes: [
      { number: 1, title: "Ryomen Sukuna", duration: "24min" },
      { number: 2, title: "For Myself", duration: "24min" }
    ]
  },
  {
    id: 4,
    title: "My Hero Academia",
    poster: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400&q=75&auto=format",
    rating: 8.5,
    genre: ["Action", "Comedy", "School"],
    synopsis: "A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy.",
    episodes: [
      { number: 1, title: "Izuku Midoriya: Origin", duration: "24min" },
      { number: 2, title: "What It Takes to Be a Hero", duration: "24min" }
    ]
  },
  {
    id: 5,
    title: "One Punch Man",
    poster: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&q=75&auto=format",
    rating: 8.7,
    genre: ["Action", "Comedy", "Parody"],
    synopsis: "The story of Saitama, a hero that can defeat any opponent with a single punch but seeks to find a worthy opponent.",
    episodes: [
      { number: 1, title: "The Strongest Man", duration: "24min" },
      { number: 2, title: "The Lone Cyborg", duration: "24min" }
    ]
  },
  {
    id: 6,
    title: "Naruto Shippuden",
    poster: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&q=75&auto=format",
    rating: 8.6,
    genre: ["Action", "Adventure", "Martial Arts"],
    synopsis: "Naruto Uzumaki wants to be the best ninja in the land. He's done well so far, but he must now train harder.",
    episodes: [
      { number: 1, title: "Homecoming", duration: "23min" },
      { number: 2, title: "The Akatsuki Makes Its Move", duration: "23min" }
    ]
  }
];
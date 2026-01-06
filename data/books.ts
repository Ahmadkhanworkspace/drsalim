export interface Book {
  id: number;
  title: string;
  description: string;
  amazonLink: string;
  coverImage: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Divine Providence",
    description: "Discover the profound concept of Divine Providence (Rububiyah). Dr. Muhammad Salim explores the divine influence over creation and the guidance provided by the Creator in every aspect of life. This book offers deep insights into the relationship between humanity and the Divine.",
    amazonLink: "https://www.amazon.com",
    coverImage: "/images/book1.jpg"
  },
  {
    id: 2,
    title: "Human Journey",
    description: "Embark on a profound journey through the stages of human existence. Delve into the essence of the soul, its path through life, and its ultimate destination. Dr. Muhammad Salim offers a scholarly and reflective exploration of life's purpose.",
    amazonLink: "https://www.amazon.com",
    coverImage: "/images/book2.jpg"
  },
  {
    id: 3,
    title: "Divine Providence Vol 2",
    description: "The second volume in the Divine Providence series, delving deeper into the intricate workings of God's will in the world. This advanced text explores the theological and philosophical dimensions of Rububiyah with extensive scholarly analysis.",
    amazonLink: "https://www.amazon.com",
    coverImage: "/images/book3.jpg"
  },
  {
    id: 4,
    title: "Brotherhood",
    description: "A comprehensive guide to the principles of brotherhood in Islam. This book explores the social and spiritual bonds that connect the community, emphasizing unity, compassion, and mutual support as foundational elements of a healthy society.",
    amazonLink: "https://www.amazon.com",
    coverImage: "/images/book4.jpg"
  },
  {
    id: 5,
    title: "Spiritual Diseases",
    description: "A transformative guide to identifying and curing the ailments of the heart. Drawing from classical Islamic psychology and spirituality, Dr. Salim provides practical remedies for spiritual diseases such as pride, envy, and anger, guiding readers toward spiritual purification.",
    amazonLink: "https://www.amazon.com",
    coverImage: "/images/book5.jpg"
  }
];

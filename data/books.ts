export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  fullSynopsis?: string;
  amazonLink: string;
  amazonKindleLink?: string;
  coverImage: string;
  pages?: number;
  isbn?: string;
  publishedYear?: number;
  award?: string;
  price?: string;
  chapters?: string[];
  keyThemes?: string[];
  sampleExcerpt?: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Divine Providence",
    subtitle: "The Reality of Rububiyah & Divine Sustenance in Human Life",
    description: "Discover the profound concept of Divine Providence (Rububiyah). Dr. Muhammad Salim explores the divine influence over creation and the guidance provided by the Creator in every aspect of life. This book offers deep insights into the relationship between humanity and the Divine.",
    fullSynopsis: "Divine Providence (Vol. 1) addresses the deepest spiritual and philosophical question facing humanity: How does our Creator nurture, sustain, and guide creation throughout every stage of existence? Dr. Muhammad Salim explores the comprehensive Islamic concept of Rububiyah—divine guardianship, provision, and moral upbringing.\n\nDrawing directly from Quranic verses, prophetic traditions, and contemporary observations, this volume demonstrates how divine purpose operates beneath the surface of everyday events. Whether you are facing personal adversity, searching for deeper spiritual peace, or seeking clarity on destiny and free will, this book provides an anchor of reassurance and practical guidance.",
    amazonLink: "https://www.amazon.com",
    amazonKindleLink: "https://www.amazon.com",
    coverImage: "/images/books/divine-providence-cover.jpg",
    pages: 364,
    isbn: "978-969-9022-01-2",
    publishedYear: 2018,
    award: "Presidential Seerat Conference Citation",
    price: "$18.99",
    chapters: [
      "1. The Core Meaning of Rububiyah (Divine Sustenance)",
      "2. The Signs of Care in Creation and Cosmology",
      "3. Human Destiny and the Balance of Free Will",
      "4. The Sustenance of the Soul: Revelation & Guidance",
      "5. Prayer, Du'a, and Direct Communication with Allah",
      "6. Overcoming Materialistic Despair in Modern Society"
    ],
    keyThemes: [
      "Gain clarity on how Divine Care (Rububiyah) governs creation and personal life",
      "Understand the balance between trusting Allah's plan (Tawakkul) and taking personal responsibility",
      "Find practical mental calmness and spiritual peace during times of hardship",
      "Reconcile modern scientific inquiry with timeless Quranic truths"
    ],
    sampleExcerpt: "To understand Divine Providence, one must first recognize that sustenance is not restricted to material food and shelter. The highest form of Rububiyah is spiritual nourishment—the light of conscious awareness, the capacity to choose good over evil, and the divine reminders that awaken the dormant heart."
  },
  {
    id: 2,
    title: "Human Journey",
    subtitle: "From Pre-existence to the Eternal Abode",
    description: "Embark on a profound journey through the stages of human existence. Delve into the essence of the soul, its path through life, and its ultimate destination. Dr. Muhammad Salim offers a scholarly and reflective exploration of life's purpose.",
    fullSynopsis: "Where did we come from, why are we here, and what awaits us after this transient world? 'Human Journey' maps out the complete cosmic path of the human being from the realm of souls (Alam-e-Arwah) to earthly existence, the intermediate realm (Barzakh), and the eternal meeting with the Creator.\n\nWritten in clear, warm, and uplifting prose, Dr. Muhammad Salim explains the purpose of human trials, the gift of moral conscience, and how our earthly choices shape our eternal destiny. This book serves as both a roadmap for self-reflection and a source of hope for anyone seeking lasting life meaning.",
    amazonLink: "https://www.amazon.com",
    amazonKindleLink: "https://www.amazon.com",
    coverImage: "/images/books/brotherhood-cover.jpg",
    pages: 320,
    isbn: "978-969-9022-02-9",
    publishedYear: 2020,
    price: "$17.50",
    chapters: [
      "1. The Primordial Covenant (Alam-e-Arwah)",
      "2. The Earthly Station & The Gift of Moral Consciousness",
      "3. The Internal Struggle: Reason vs. Desires",
      "4. The Transition: Death and the Realm of Barzakh",
      "5. The Day of Reckoning: Divine Justice & Mercy",
      "6. The Eternal Abode: Living with an Akhirah-Centric Heart"
    ],
    keyThemes: [
      "Understand the complete trajectory of the human soul across all four life stages",
      "Transform your perception of earthly trials from burdens into spiritual opportunities",
      "Overcome the fear of mortality through understanding the journey of the soul",
      "Learn daily habits to live with moral intentionality and tranquility"
    ],
    sampleExcerpt: "The human being does not begin at physical birth, nor does consciousness dissolve at biological death. We are travelers passing through a brief station in time, sent with a specific trust and an innate yearning to return to our Creator."
  },
  {
    id: 3,
    title: "Divine Providence Vol 2",
    subtitle: "Advanced Reflections on Divine Wisdom, Justice & Human History",
    description: "The second volume in the Divine Providence series, delving deeper into the intricate workings of God's will in the world. This advanced text explores the theological and philosophical dimensions of Rububiyah with extensive scholarly analysis.",
    fullSynopsis: "Expanding upon the foundation laid in Volume 1, this second volume delves into the profound questions of divine justice, the purpose of suffering, and how moral laws govern the rise and fall of human societies.\n\nDr. Muhammad Salim provides comforting, rational, and faith-affirming answers to questions about adversity, hardship, and divine wisdom (Hikmah). Through historical examples and Quranic insights, readers learn to cultivate spiritual discernment (Basirah) and see the hand of divine care even in the most turbulent world events.",
    amazonLink: "https://www.amazon.com",
    amazonKindleLink: "https://www.amazon.com",
    coverImage: "/images/books/divine-providence-cover.jpg",
    pages: 398,
    isbn: "978-969-9022-03-6",
    publishedYear: 2021,
    price: "$19.99",
    chapters: [
      "1. Deeper Dimensions of Divine Wisdom (Hikmah)",
      "2. The Question of Suffering and Human Perception",
      "3. Divine Justice in Societal Evolution and History",
      "4. Moral Causality: The Spiritual Laws of Nations",
      "5. Developing Spiritual Discernment (Basirah)",
      "6. Cultivating Constant Gratitude and Reassurance"
    ],
    keyThemes: [
      "Discover the hidden wisdom behind personal challenges and human suffering",
      "Learn how moral and ethical principles dictate the long-term rise and fall of communities",
      "Strengthen your faith against modern existential skepticism",
      "Develop spiritual vision to see blessings hidden within difficulties"
    ],
    sampleExcerpt: "When viewed from the limited lens of immediate comfort, adversity appears senseless. But when viewed through the lens of Rububiyah, trials are divine medicine designed to strip away arrogance and awaken sincere reliance upon the Almighty."
  },
  {
    id: 4,
    title: "Brotherhood",
    subtitle: "A Foundation for Peaceful Society (#1 National Bestseller)",
    description: "A comprehensive guide to the principles of brotherhood in Islam. This book explores the social and spiritual bonds that connect the community, emphasizing unity, compassion, and mutual support as foundational elements of a healthy society.",
    fullSynopsis: "Conferred the prestigious National Seerat Award, 'Brotherhood' is Dr. Muhammad Salim's celebrated masterpiece on social harmony, community ethics, and conflict resolution.\n\nIn a world increasingly fractured by tribalism, political polarization, and social disconnection, this book provides a timely blueprint for building genuine bonds of trust. Drawing upon the historic brotherhood established between the Muhajirun and Ansar in Madinah, Dr. Salim demonstrates how mutual empathy, fair speech, and shared moral responsibility can heal broken relationships and build a peaceful society.",
    amazonLink: "https://www.amazon.com",
    amazonKindleLink: "https://www.amazon.com",
    coverImage: "/images/books/brotherhood-cover.jpg",
    pages: 428,
    isbn: "978-969-9022-04-3",
    publishedYear: 2019,
    award: "Conferred National Seerat Award",
    price: "$21.50",
    chapters: [
      "1. The Core Meaning of Islamic Brotherhood (Ukhuwwah)",
      "2. The Madinah Model: How the Prophet Healed Tribal Divides",
      "3. Psychological Barriers: Arrogance, Envy, and Suspicion",
      "4. The Etiquette of Disagreement & Peaceful Conflict Resolution",
      "5. Empathy in Action: Social Safety Nets and Mutual Aid",
      "6. Cultivating Unity in Modern Diverse Communities"
    ],
    keyThemes: [
      "Actionable techniques for resolving interpersonal conflicts with humility and respect",
      "Study how the Prophet Muhammad (PBUH) eradicated longstanding ethnic and tribal feuds",
      "Purify the heart from prejudice, malicious gossip, and baseless suspicions",
      "Practical ways to foster social cohesion and mutual charity within families and neighborhoods"
    ],
    sampleExcerpt: "True brotherhood is not merely polite social courtesy; it is an active spiritual contract. It means desiring for your brother what you desire for yourself, defending his honor in his absence, and covering his faults while gently encouraging his growth."
  },
  {
    id: 5,
    title: "Spiritual Diseases",
    subtitle: "Management & Purification of the Heart",
    description: "A transformative guide to identifying and curing the ailments of the heart. Drawing from classical Islamic psychology and spirituality, Dr. Salim provides practical remedies for spiritual diseases such as pride, envy, and anger, guiding readers toward spiritual purification.",
    fullSynopsis: "Just as the physical body suffers from ailments that require precise medical diagnosis and treatment, the human heart suffers from spiritual diseases—such as pride (Kibr), envy (Hasad), ostentation (Riya), and bitterness—that corrupt character and rob life of inner peace.\n\nIn 'Spiritual Diseases & Their Management', Dr. Muhammad Salim combines timeless prophetic guidance with deep psychological insights. Readers are guided through a gentle, compassionate, and systematic process of diagnosing their inner ailments and applying daily remedies to cultivate a sound, luminous, and peaceful heart (Qalb Saleem).",
    amazonLink: "https://www.amazon.com",
    amazonKindleLink: "https://www.amazon.com",
    coverImage: "/images/books/spiritual-diseases-cover.jpg",
    pages: 352,
    isbn: "978-969-9022-05-0",
    publishedYear: 2022,
    award: "Prime Ministerial Seerat Award Winner",
    price: "$18.50",
    chapters: [
      "1. Anatomy of the Spiritual Heart and Its Primordial Light",
      "2. The Root Sickness: Subtle Pride (Kibr) and Self-Delusion",
      "3. The Venom of Envy (Hasad) and How to Celebrate Others",
      "4. Anger, Impatience, and the Art of Emotional Restraint",
      "5. Healing the Tongue: Slander, Gossip, and Unkind Speech",
      "6. The Daily Regimen for Heart Purification (Tazkiyah)"
    ],
    keyThemes: [
      "Identify the subtle signs of spiritual ailments before they harm relationships and peace of mind",
      "Apply concrete behavioral remedies to overcome jealousy, arrogance, and short tempers",
      "Develop sincere humility without losing healthy self-respect",
      "Establish a sustainable daily spiritual routine that softens the heart"
    ],
    sampleExcerpt: "The heart is the master of the limbs. When it is sound, the entire personality reflects gentle patience, kindness, and moral courage. But when it harbors unchecked resentments or silent pride, no amount of outward ritual can conceal the inner unrest."
  }
];

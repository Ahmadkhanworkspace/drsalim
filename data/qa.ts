export interface QAItem {
    id: number;
    question: string;
    askedBy: string;
    category: 'Spiritual Health' | 'Divine Destiny' | 'Family & Brotherhood' | 'Modern Life';
    date: string;
    answer: string;
    bookReference?: {
        title: string;
        bookId: number;
    };
}

export const curatedQA: QAItem[] = [
    {
        id: 1,
        question: "How does one distinguish between healthy self-esteem and the spiritual disease of subtle pride (Kibr)?",
        askedBy: "Tariq M. · London, UK",
        category: "Spiritual Health",
        date: "October 14, 2025",
        answer: "The Prophet Muhammad (peace be upon him) provided the exact definition of pride when he said: 'Pride is rejecting the truth and looking down upon people.' \n\nHealthy self-respect is being grateful to Allah for the talents and blessings He has bestowed upon you, recognizing that all goodness originates from Him. Pride begins the moment you compare yourself to another person and inwardly think, 'I am superior to them.' The remedy is to immediately remember your faults and acknowledge that the final outcome of any soul is known only to the Creator.",
        bookReference: {
            title: "Spiritual Diseases & Management",
            bookId: 5
        }
    },
    {
        id: 2,
        question: "Why do sincere and righteous people often experience prolonged illnesses or personal adversity?",
        askedBy: "Amina K. · Lahore, Pakistan",
        category: "Divine Destiny",
        date: "November 2, 2025",
        answer: "When we look at life purely through a material lens, hardship looks like punishment or abandonment. But in the Quranic perspective of Rububiyah (Divine Sustenance), trials are spiritual medicine.\n\nAdversity strips away the illusion of self-sufficiency. It purifies accumulated sins, softens the heart toward others who suffer, and elevates one's spiritual station in the Hereafter. The prophets experienced the greatest hardships of all humans—not because Allah disliked them, but because through patient endurance (Sabr), their souls reflected divine nobility.",
        bookReference: {
            title: "Divine Providence (Vol. 1)",
            bookId: 1
        }
    },
    {
        id: 3,
        question: "How can we maintain bonds of brotherhood with relatives who hold deeply hostile views or cause family friction?",
        askedBy: "Farhan S. · Karachi, Pakistan",
        category: "Family & Brotherhood",
        date: "December 18, 2025",
        answer: "Islam does not demand that you allow yourself to be emotionally abused or provoked into sin. However, it commands Silat ar-Rahim (joining ties of kinship).\n\nMaintaining ties can be as simple as greeting them with peace, sending warm greetings on Eid, visiting during illness, and making silent supplication for their guidance. You may maintain polite, respectful boundaries without cutting off communication entirely. The highest standard of character is returning kindness in the face of coldness.",
        bookReference: {
            title: "Brotherhood: A Foundation for Peaceful Society",
            bookId: 4
        }
    },
    {
        id: 4,
        question: "How do I balance supplication (Du'a) with accepting whatever Allah has already decreed?",
        askedBy: "Zainab B. · Dallas, USA",
        category: "Divine Destiny",
        date: "January 8, 2026",
        answer: "Du'a itself is an act of worship and reliance. Asking Allah for lawful goodness, relief, and guidance does not contradict contentment with destiny (Rida bil-Qada).\n\nWhen you pray, pour your heart out with complete humility and conviction. But in your inner heart, attach yourself to Allah rather than to the specific outcome. Say: 'O Allah, grant me this if it is good for my faith and life, and if not, grant me contentment with what You have chosen.' In this way, you fulfill the duty of supplication while remaining at peace with His wisdom.",
        bookReference: {
            title: "Divine Providence (Vol. 2)",
            bookId: 3
        }
    },
    {
        id: 5,
        question: "How should modern youth combat constant feelings of existential emptiness and social media anxiety?",
        askedBy: "Bilal H. · Toronto, Canada",
        category: "Modern Life",
        date: "February 1, 2026",
        answer: "Existential anxiety in modern culture stems largely from constant outward comparison and disconnected living. Social media algorithms feed our lower desires (Hawa) with fleeting validation, which leaves the heart restless.\n\nThe human heart was created to find peace in remembrance of Allah (Dhikr) and living with purpose. I advise young people to implement a 'digital fast' for one hour every evening, spend time in nature, engage in physical charitable service, and read contemplative books that orient the soul toward eternity rather than temporary trends.",
        bookReference: {
            title: "Human Journey: From Pre-existence to Eternal Abode",
            bookId: 2
        }
    },
    {
        id: 6,
        question: "What is the first step to curing envy (Hasad) when we find ourselves feeling bitter about someone else's success?",
        askedBy: "Nadia R. · Islamabad, Pakistan",
        category: "Spiritual Health",
        date: "February 20, 2026",
        answer: "Envy is unique because it causes the envier pain before it harms the one being envied. The classical remedy has two steps:\n\nFirst, recognize that by envying someone's blessing, you are unconsciously objecting to Allah's distribution of bounty. Second, force your tongue to make sincere du'a for increase in that person's blessing: 'O Allah, bless them even more and grant me contentment.' The soul initially resists this, but with repeated practice, the poison of envy dissolves into genuine goodwill.",
        bookReference: {
            title: "Spiritual Diseases & Management",
            bookId: 5
        }
    }
];

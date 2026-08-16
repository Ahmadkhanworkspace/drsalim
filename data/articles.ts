export interface Article {
    id: number;
    title: string;
    date: string;
    category: string;
    views: number;
    comments: number;
    slug: string;
    thumbnail: string;
    content?: string;
    _id?: string;
}

export const articles: Article[] = [
    {
        id: 1,
        title: "Evil Web",
        date: "June 17, 2023",
        category: "Men & Evil Web",
        views: 194200,
        comments: 219,
        slug: "evil-web",
        thumbnail: "/images/articles/evil-web.jpg"
    },
    {
        id: 2,
        title: "The Status of heart in Human Personality",
        date: "August 11, 2023",
        category: "Men & Evil Web",
        views: 152600,
        comments: 182,
        slug: "status-of-heart",
        thumbnail: "/images/articles/heart-status.jpg"
    },
    {
        id: 3,
        title: "Different States of Heart",
        date: "September 11, 2023",
        category: "Men & Evil Web",
        views: 98700,
        comments: 116,
        slug: "different-states-heart",
        thumbnail: "/images/articles/heart-states.jpg"
    },
    {
        id: 4,
        title: "Transformation of the Heart",
        date: "September 22, 2023",
        category: "Men & Evil Web",
        views: 124300,
        comments: 146,
        slug: "transformation-heart",
        thumbnail: "/images/articles/transformation.jpg"
    },
    {
        id: 5,
        title: "Some Aspects of Diseases",
        date: "October 21, 2023",
        category: "Men & Evil Web",
        views: 36400,
        comments: 44,
        slug: "aspects-diseases",
        thumbnail: "/images/articles/diseases.jpg"
    },
    {
        id: 6,
        title: "Hypocrisy: The Most Serious Spiritual Diseases",
        date: "January 2, 2024",
        category: "Men & Evil Web",
        views: 168400,
        comments: 159,
        slug: "hypocrisy-spiritual-disease",
        thumbnail: "/images/articles/hypocrisy.jpg"
    },
    {
        id: 7,
        title: "TAUGHT AS A COMPONENT OF EVIL WEB",
        date: "March 12, 2024",
        category: "Men & Evil Web",
        views: 20300,
        comments: 43,
        slug: "taught-evil-web",
        thumbnail: "/images/articles/taught.jpg"
    },
    {
        id: 8,
        title: "MODERATION: AN ANALYSIS",
        date: "April 17, 2024",
        category: "Articles",
        views: 84100,
        comments: 84,
        slug: "moderation-analysis",
        thumbnail: "/images/articles/moderation.jpg"
    },
    {
        id: 9,
        title: "JUSTICE: AN ISLAMIC PERSPECTIVE",
        date: "February 4, 2025",
        category: "Articles",
        views: 248500,
        comments: 284,
        slug: "justice-islamic-perspective",
        thumbnail: "/images/articles/justice.jpg"
    },
    {
        id: 10,
        title: "Hidayat",
        date: "June 22, 2025",
        category: "Blog",
        views: 72500,
        comments: 71,
        slug: "hidayat",
        thumbnail: "/images/articles/hidayat.jpg"
    }
];

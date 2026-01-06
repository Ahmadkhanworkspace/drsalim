import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
    id: number; // Keeping legacy numeric ID for now to match UI, or we can switch to _id
    title: string;
    date: string;
    category: string;
    views: number;
    comments: number;
    slug: string;
    thumbnail: string;
    content?: string;
    published: boolean;
    featuredImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ArticleSchema = new Schema<IArticle>({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    slug: { type: String, required: true },
    thumbnail: { type: String },
    content: { type: String },
    published: { type: Boolean, default: true },
    featuredImage: { type: String },
}, {
    timestamps: true,
});

// Prevent overwrite of model if already compiled
const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;

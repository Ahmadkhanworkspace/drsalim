'use server';

import dbConnect from '@/lib/mongodb';
import Article, { IArticle } from '@/models/Article';
import { articles as initialArticles } from '@/data/articles';
import { promises as fs } from 'fs';
import path from 'path';

const JSON_PATH = path.join(process.cwd(), 'data/articles.json');

// --- JSON Fallback Helpers ---

async function getJsonArticles(): Promise<any[]> {
    try {
        const content = await fs.readFile(JSON_PATH, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        // If file likely doesn't exist, return seed data
        return initialArticles.map(a => ({
            ...a,
            _id: a.id.toString(),
            published: true,
            createdAt: new Date().toISOString()
        }));
    }
}

async function saveJsonArticles(articles: any[]) {
    await fs.writeFile(JSON_PATH, JSON.stringify(articles, null, 4), 'utf8');
}

// --- Main Actions ---

function serializeArticle(doc: any): any {
    const obj = doc.toObject ? doc.toObject() : doc;
    obj._id = obj._id?.toString() || obj.id.toString();
    if (obj.createdAt) obj.createdAt = new Date(obj.createdAt).toISOString();
    if (obj.updatedAt) obj.updatedAt = new Date(obj.updatedAt).toISOString();
    return obj;
}

export async function getArticles() {
    try {
        await dbConnect();

        // Seed Mongo if empty
        const count = await Article.countDocuments();
        if (count === 0) {
            await Article.insertMany(initialArticles.map(a => ({
                ...a,
                published: true,
                content: 'Seeded content...'
            })));
        }

        const articles = await Article.find({}).sort({ createdAt: -1 });
        return articles.map(serializeArticle);
    } catch (error) {
        console.warn('MongoDB failed. Falling back to local JSON file.');
        return await getJsonArticles();
    }
}

export async function getArticle(id: number) {
    try {
        await dbConnect();
        const article = await Article.findOne({ id });
        return article ? serializeArticle(article) : undefined;
    } catch (error) {
        // Fallback to JSON
        const articles = await getJsonArticles();
        return articles.find((a: any) => a.id === id);
    }
}

export async function updateArticle(articleId: number, data: Partial<IArticle>) {
    try {
        await dbConnect();
        const article = await Article.findOneAndUpdate(
            { id: articleId },
            { $set: data },
            { new: true, runValidators: true }
        );
        if (!article) throw new Error('Article not found');
        return { success: true, article: serializeArticle(article) };
    } catch (error) {
        console.warn('MongoDB Update failed. Saving to local JSON file.');
        try {
            // JSON Fallback Write
            const articles = await getJsonArticles();
            const index = articles.findIndex((a: any) => a.id === articleId);

            if (index === -1) {
                throw new Error('Article not found in local storage');
            }

            // Update
            articles[index] = { ...articles[index], ...data };

            // Persist
            await saveJsonArticles(articles);
            return { success: true, article: articles[index] };

        } catch (fsError) {
            console.error('Filesystem Backup also failed:', fsError);
            return { success: false, error: 'Failed to save changes to both Database and Local File.' };
        }
    }
}
// --- Book Actions ---

import { books as initialBooks } from '@/data/books';
import Book from '@/models/Book';

const BOOKS_JSON_PATH = path.join(process.cwd(), 'data/books.json');

async function getJsonBooks(): Promise<any[]> {
    try {
        const content = await fs.readFile(BOOKS_JSON_PATH, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        return initialBooks.map(b => ({
            ...b,
            _id: b.id.toString(),
            sales: 0,
            revenue: 0,
            price: 10,
            createdAt: new Date().toISOString()
        }));
    }
}

async function saveJsonBooks(books: any[]) {
    await fs.writeFile(BOOKS_JSON_PATH, JSON.stringify(books, null, 4), 'utf8');
}

export async function getBooks() {
    try {
        await dbConnect();

        // Seed if empty
        const count = await Book.countDocuments();
        if (count === 0) {
            // Transform initial data to match schema
            await Book.insertMany(initialBooks.map(b => ({
                ...b,
                price: 19.99,
                sales: Math.floor(Math.random() * 50),
                revenue: Math.floor(Math.random() * 1000)
            })));
        }

        const books = await Book.find({}).sort({ createdAt: -1 });
        return books.map(doc => {
            const obj = doc.toObject();
            obj._id = obj._id.toString();
            // Map MongoDB _id to string 'id' for frontend compatibility if needed, 
            // but keep _id for backend operations. 
            // The frontend currently uses 'id' from static data.
            // We'll expose 'id' as the string property.
            return { ...obj, id: obj._id };
        });
    } catch (error) {
        console.warn('MongoDB failed for Books. Using JSON fallback.');
        return await getJsonBooks();
    }
}

export async function updateBook(id: string, data: any) {
    try {
        await dbConnect();
        const book = await Book.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        );
        if (!book) throw new Error('Book not found');
        const obj = book.toObject();
        return { success: true, book: { ...obj, id: obj._id.toString() } };
    } catch (error) {
        console.warn('MongoDB Update Book failed. Using JSON.');
        try {
            const books = await getJsonBooks();
            const index = books.findIndex((b: any) => b.id === id || b._id === id);
            if (index === -1) throw new Error('Book not found locally');

            books[index] = { ...books[index], ...data };
            await saveJsonBooks(books);
            return { success: true, book: books[index] };
        } catch (fsError) {
            return { success: false, error: 'Failed to update book.' };
        }
    }
}

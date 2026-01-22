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

export async function createArticle(data: Partial<IArticle>) {
    try {
        await dbConnect();
        // Generate simple numeric ID
        const maxIdDoc = await Article.findOne().sort({ id: -1 });
        const nextId = (maxIdDoc?.id || 0) + 1;

        const article = await Article.create({ ...data, id: nextId });
        return { success: true, article: serializeArticle(article) };
    } catch (error) {
        console.warn('MongoDB Create Article failed. Using JSON.');
        try {
            const articles = await getJsonArticles();
            const maxId = articles.reduce((max: number, a: any) => Math.max(max, a.id || 0), 0);
            const newArticle = {
                ...data,
                id: maxId + 1,
                published: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            articles.unshift(newArticle);
            await saveJsonArticles(articles);
            return { success: true, article: newArticle };
        } catch (fsError) {
            return { success: false, error: 'Failed to create article.' };
        }
    }
}

export async function deleteArticle(id: number) {
    try {
        await dbConnect();
        const article = await Article.findOneAndDelete({ id });
        if (!article) throw new Error('Article not found');
        return { success: true };
    } catch (error) {
        console.warn('MongoDB Delete Article failed. Using JSON.');
        try {
            let articles = await getJsonArticles();
            const initialLength = articles.length;
            articles = articles.filter((a: any) => a.id !== id);

            if (articles.length === initialLength) throw new Error('Article not found locally');

            await saveJsonArticles(articles);
            return { success: true };
        } catch (fsError) {
            return { success: false, error: 'Failed to delete article.' };
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

export async function createBook(data: any) {
    try {
        await dbConnect();
        const book = await Book.create(data);
        const obj = book.toObject();
        return { success: true, book: { ...obj, id: obj._id.toString() } };
    } catch (error) {
        console.warn('MongoDB Create Book failed. Using JSON.');
        try {
            const books = await getJsonBooks();
            const newBook = {
                ...data,
                id: Date.now().toString(),
                sales: 0,
                revenue: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            books.unshift(newBook);
            await saveJsonBooks(books);
            return { success: true, book: newBook };
        } catch (fsError) {
            return { success: false, error: 'Failed to create book.' };
        }
    }
}

export async function deleteBook(id: string) {
    try {
        await dbConnect();
        const book = await Book.findByIdAndDelete(id);
        if (!book) throw new Error('Book not found');
        return { success: true };
    } catch (error) {
        console.warn('MongoDB Delete Book failed. Using JSON.');
        try {
            let books = await getJsonBooks();
            const initialLength = books.length;
            books = books.filter((b: any) => b.id !== id && b._id !== id);

            if (books.length === initialLength) throw new Error('Book not found locally');

            await saveJsonBooks(books);
            return { success: true };
        } catch (fsError) {
            return { success: false, error: 'Failed to delete book.' };
        }
    }
}

// --- Withdrawal Actions ---

import Withdrawal from '@/models/Withdrawal';

const WITHDRAWALS_JSON_PATH = path.join(process.cwd(), 'data/withdrawals.json');

async function getJsonWithdrawals(): Promise<any[]> {
    try {
        const content = await fs.readFile(WITHDRAWALS_JSON_PATH, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        return [];
    }
}

async function saveJsonWithdrawals(withdrawals: any[]) {
    await fs.writeFile(WITHDRAWALS_JSON_PATH, JSON.stringify(withdrawals, null, 4), 'utf8');
}

export async function createWithdrawal(data: any) {
    try {
        await dbConnect();
        const withdrawal = await Withdrawal.create(data);
        const obj = withdrawal.toObject();
        return { success: true, withdrawal: { ...obj, id: obj._id.toString() } };
    } catch (error) {
        console.warn('MongoDB Create Withdrawal failed. Using JSON.');
        try {
            const withdrawals = await getJsonWithdrawals();
            const newWithdrawal = {
                ...data,
                id: `WD-${Date.now()}`,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            withdrawals.unshift(newWithdrawal);
            await saveJsonWithdrawals(withdrawals);
            return { success: true, withdrawal: newWithdrawal };
        } catch (fsError) {
            return { success: false, error: 'Failed to create withdrawal.' };
        }
    }
}

export async function getWithdrawals() {
    try {
        await dbConnect();
        const withdrawals = await Withdrawal.find({}).sort({ createdAt: -1 });
        return withdrawals.map(w => {
            const obj = w.toObject();
            return { ...obj, id: obj._id.toString() };
        });
    } catch (error) {
        console.warn('MongoDB Get Withdrawals failed. Using JSON.');
        return await getJsonWithdrawals();
    }
}

// --- Comment Actions ---

import Comment from '@/models/Comment';

const COMMENTS_JSON_PATH = path.join(process.cwd(), 'data/comments.json');

async function getJsonComments(): Promise<any[]> {
    try {
        const content = await fs.readFile(COMMENTS_JSON_PATH, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        return [];
    }
}

async function saveJsonComments(comments: any[]) {
    await fs.writeFile(COMMENTS_JSON_PATH, JSON.stringify(comments, null, 4), 'utf8');
}

export async function getComments() {
    try {
        await dbConnect();
        // Populate articleId to get the title
        // In some setups, articleId is a number (legacy) or ObjectId. 
        // Our Article model has `id` (number) and `_id` (ObjectId).
        // Comment model refs 'Article' via ObjectId usually.
        const comments = await Comment.find({}).sort({ createdAt: -1 }).populate('articleId');
        return comments.map(c => {
            const obj = c.toObject();
            return {
                ...obj,
                id: obj._id.toString(),
                articleTitle: obj.articleId?.title || 'Unknown Article',
                articleId: obj.articleId?._id?.toString()
            };
        });
    } catch (error) {
        console.warn('MongoDB Get Comments failed. Using JSON.');
        const comments = await getJsonComments();
        return comments;
    }
}

export async function updateComment(id: string, data: any) {
    try {
        await dbConnect();
        const comment = await Comment.findByIdAndUpdate(id, data, { new: true });
        if (!comment) throw new Error('Comment not found');
        return { success: true };
    } catch (error) {
        console.warn('MongoDB Update Comment failed. Using JSON.');
        try {
            const comments = await getJsonComments();
            const index = comments.findIndex((c: any) => c.id === id);
            if (index !== -1) {
                comments[index] = { ...comments[index], ...data };
                await saveJsonComments(comments);
                return { success: true };
            }
            return { success: false, error: 'Comment not found locally' };
        } catch (fsError) {
            return { success: false, error: 'Failed to update comment' };
        }
    }
}

export async function deleteComment(id: string) {
    try {
        await dbConnect();
        await Comment.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        console.warn('MongoDB Delete Comment failed. Using JSON.');
        try {
            let comments = await getJsonComments();
            comments = comments.filter((c: any) => c.id !== id);
            await saveJsonComments(comments);
            return { success: true };
        } catch (fsError) {
            return { success: false, error: 'Failed to delete comment' };
        }
    }
}

export async function importComments(importedData: any[]) {
    try {
        await dbConnect();
        const results = { imported: 0, failed: 0, skipped: 0 };

        for (const item of importedData) {
            // Find article by title (case-insensitive search could be better, but exact match for now)
            // We use collation for case-insensitive if needed, or regex. 
            // Let's use exact match as per request "per respective article".
            const article = await Article.findOne({ title: item.articleTitle });

            if (article) {
                await Comment.create({
                    articleId: article._id,
                    author: item.author,
                    email: item.email,
                    content: item.content,
                    approved: item.approved,
                    createdAt: item.createdAt || new Date()
                });
                results.imported++;
            } else {
                results.skipped++;
            }
        }
        return { success: true, ...results };
    } catch (error) {
        console.error('Import failed:', error);
        return { success: false, error: 'Database import failed' };
    }
}

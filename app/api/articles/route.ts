import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';

// GET all articles
export async function GET() {
    try {
        await dbConnect();
        const articles = await Article.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: articles });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch articles' }, { status: 500 });
    }
}

// POST create new article
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const article = await Article.create(body);
        return NextResponse.json({ success: true, data: article }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create article' }, { status: 400 });
    }
}

// PUT update article
export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, ...updateData } = body;

        const article = await Article.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!article) {
            return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: article });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update article' }, { status: 400 });
    }
}

// DELETE article
export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const article = await Article.findByIdAndDelete(id);

        if (!article) {
            return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete article' }, { status: 400 });
    }
}

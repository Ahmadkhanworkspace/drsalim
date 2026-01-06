import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';

// GET all books
export async function GET() {
    try {
        await dbConnect();
        const books = await Book.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: books });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch books' }, { status: 500 });
    }
}

// POST create new book
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const book = await Book.create(body);
        return NextResponse.json({ success: true, data: book }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create book' }, { status: 400 });
    }
}

// PUT update book
export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, ...updateData } = body;

        const book = await Book.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!book) {
            return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: book });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update book' }, { status: 400 });
    }
}

// DELETE book
export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete book' }, { status: 400 });
    }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Comment from '@/models/Comment';

// GET all comments
export async function GET() {
    try {
        await dbConnect();
        const comments = await Comment.find({}).sort({ createdAt: -1 }).populate('articleId');
        return NextResponse.json({ success: true, data: comments });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch comments' }, { status: 500 });
    }
}

// POST create new comment
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const comment = await Comment.create(body);
        return NextResponse.json({ success: true, data: comment }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create comment' }, { status: 400 });
    }
}

// PUT update comment (approve/reject)
export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id, ...updateData } = body;

        const comment = await Comment.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!comment) {
            return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: comment });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update comment' }, { status: 400 });
    }
}

// DELETE comment
export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete comment' }, { status: 400 });
    }
}

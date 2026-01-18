import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Withdrawal from '@/models/Withdrawal';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const { amount, method, bankDetails } = body;

        // Basic validation
        if (!amount || !method) {
            return NextResponse.json(
                { message: 'Amount and payment method are required' },
                { status: 400 }
            );
        }

        if (method === 'bank' && (!bankDetails?.accountName || !bankDetails?.accountNumber)) {
            return NextResponse.json(
                { message: 'Bank details are incomplete' },
                { status: 400 }
            );
        }

        const withdrawal = await Withdrawal.create({
            amount,
            method,
            bankDetails: method === 'bank' ? bankDetails : undefined,
            status: 'pending',
        });

        return NextResponse.json({
            id: `WD-${withdrawal._id.toString().slice(-8).toUpperCase()}`,
            amount: withdrawal.amount,
            method: withdrawal.method,
            status: withdrawal.status,
            createdAt: withdrawal.createdAt
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating withdrawal:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

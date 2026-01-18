import mongoose, { Schema } from 'mongoose';

const WithdrawalSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        enum: ['gateway', 'bank'],
        required: true,
    },
    bankDetails: {
        accountName: String,
        accountNumber: String,
        bankName: String, // Optional, derived or added later
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'rejected'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Withdrawal || mongoose.model('Withdrawal', WithdrawalSchema);

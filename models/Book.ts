import mongoose, { Schema, models } from 'mongoose';

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: String,
    amazonLink: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    sales: {
        type: Number,
        default: 0,
    },
    revenue: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

BookSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default models.Book || mongoose.model('Book', BookSchema);

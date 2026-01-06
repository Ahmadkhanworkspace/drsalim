import mongoose, { Schema, models } from 'mongoose';

const CommentSchema = new Schema({
    articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default models.Comment || mongoose.model('Comment', CommentSchema);

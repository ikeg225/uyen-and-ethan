import mongoose, { Schema } from 'mongoose';

const encouragementSchema = new Schema({
    userId: String,
    timestamp: Number,
    comment: String,
    likedBy: String
});

export default mongoose.models.Encouragement || mongoose.model('Encouragement', encouragementSchema);
import mongoose, { Schema } from 'mongoose';

const oneTwoThreeSchema = new Schema({
    userId: String,
    timestamp: Number,
    comment: String,
    likedBy: String
});

export default mongoose.models.OneTwoThree || mongoose.model('OneTwoThree', oneTwoThreeSchema);
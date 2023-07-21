import mongoose, { Schema } from 'mongoose';

const betsSchema = new Schema({
    betId: Number,
    userIdWinner: String,
    date: String,
    amount: Number,
    description: String
});

export default mongoose.models.Bets || mongoose.model('Bets', betsSchema);
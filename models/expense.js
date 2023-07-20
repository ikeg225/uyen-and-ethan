import mongoose, { Schema } from 'mongoose';

const expenseSchema = new Schema({
    userId: String,
    month: Number,
    year: Number,
    day: Number,
    category: String,
    description: String,
    amount: Number
});

export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
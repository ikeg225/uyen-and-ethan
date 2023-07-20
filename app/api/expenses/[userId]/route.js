import connectMongoDB from "@/lib/mongodb";
import Expense from "@/models/expense";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { userId } = params;
    await connectMongoDB();
    const expenses = await Expense.find({ userId });
    return NextResponse.json({ expenses });
}
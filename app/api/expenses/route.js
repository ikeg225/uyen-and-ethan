import connectMongoDB from "@/lib/mongodb";
import Expense from "@/models/expense";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { userId, date, category, description, amount } = await request.json();
  await connectMongoDB();
  const dateObject = new Date(date);
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const day = dateObject.getDate();
  await Expense.create({ userId, month, year, day, category, description, amount });
  return NextResponse.json({ message: 'success' });
}
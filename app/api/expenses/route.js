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

export async function GET() {
  await connectMongoDB();
  const expenses = await Expense.find({});
  const date = new Date();
  const month = date.getMonth() + 1;

  let ethan_spendings = 0;
  let uyen_spendings = 0;
  expenses.forEach((expense) => {
    if (expense.month === month) {
      if (expense.userId === '03092002') {
        ethan_spendings += expense.amount;
      } else if (expense.userId === '01262002') {
        uyen_spendings += expense.amount;
      }
    }
  });

  return NextResponse.json({ ethan_spendings, uyen_spendings });
}
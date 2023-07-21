import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import Bets from "@/models/bets";

export async function POST(request) {
    const { userIdWinner, date, amount, description } = await request.json();
    await connectMongoDB();
    const lastBet = await Bets.find().sort({ betId: -1 }).limit(1)
    let betId = 0;
    if (lastBet.length === 0) {
        betId = 1
    } else {
        betId = lastBet[0].betId + 1;
    }
    await Bets.create({ betId, userIdWinner, date, amount, description });
    return NextResponse.json({ message: 'success' });
}

export async function PUT(request) {
    const { betId, userIdWinner } = await request.json();
    await connectMongoDB();
    await Bets.updateOne({ betId }, { userIdWinner });
    return NextResponse.json({ message: 'success' });
}

export async function GET() {
    await connectMongoDB();
    const bets = await Bets.find();
    return NextResponse.json({ bets });
}
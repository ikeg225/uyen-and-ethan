import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import Bets from "@/models/bets";

export async function GET() {
    // sums up the amount for each userIdWinner
    await connectMongoDB();
    const bets = await Bets.find();

    let ethanEarnings = 0;
    let uyenEarnings = 0;
    bets.forEach((bet) => {
        if (bet.userIdWinner === "01262002") {
            uyenEarnings += bet.amount;
        } else if (bet.userIdWinner === "03092002") {
            ethanEarnings += bet.amount;
        }
    })

    return NextResponse.json({ ethanEarnings, uyenEarnings })
}
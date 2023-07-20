import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import Encouragement from "@/models/encouragement";

export async function POST(request) {
    const { userId, timestamp } = await request.json();
    await connectMongoDB();
    await Encouragement.findOneAndUpdate({ timestamp }, { likedBy: userId });
    return NextResponse.json({ message: 'success' });
}

export async function GET() {
    await connectMongoDB();
    const encouragement = await Encouragement.find().sort({ timestamp: -1 }).limit(1);
    const timestamp = encouragement[0].timestamp;
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const date_formatted = `${month}/${day}/${year}`;
    return NextResponse.json({ date: date_formatted });
}
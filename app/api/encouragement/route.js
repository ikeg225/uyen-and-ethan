import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from 'next/server';
import Encouragement from "@/models/encouragement";

export async function POST(request) {
    const { userId, comment } = await request.json();
    await connectMongoDB();
    const timestamp = Date.now();
    const likedBy = "";
    await Encouragement.create({ userId, timestamp, comment, likedBy });
    return NextResponse.json({ message: 'success' });
}

export async function GET() {
    await connectMongoDB();
    const messages = await Encouragement.find();
    return NextResponse.json({ messages });
}
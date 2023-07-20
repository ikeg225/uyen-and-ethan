import connectMongoDB from "@/lib/mongodb";
import OneTwoThree from "@/models/1-2-3";
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { userId, comment } = await request.json();
    await connectMongoDB();
    const timestamp = Date.now();
    const likedBy = "";
    await OneTwoThree.create({ userId, timestamp, comment, likedBy });
    return NextResponse.json({ message: 'success' });
}

export async function GET() {
    await connectMongoDB();
    const oneTwoThrees = await OneTwoThree.find();
    return NextResponse.json({ oneTwoThrees });
}
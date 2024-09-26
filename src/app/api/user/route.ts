import {  NextResponse } from 'next/server';
import {prisma2} from '@/../lib/prisma';

export async function GET() {
  try {
    const  user = await prisma2.user.findMany();
    console.log("🚀 ~ GET ~ user:", user.length)
    return NextResponse.json(user);
  } catch (error: unknown) {
    return NextResponse.json({error: (error as Error).message}, {status: 500});
  }
}
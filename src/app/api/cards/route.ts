import { NextResponse } from "next/server";
import {prisma2} from '@/../lib/prisma'


export async function GET(){
    try {
        const cards = await prisma2.card.findMany();    
        return NextResponse.json(cards);
    } catch (error: unknown) {
        return NextResponse.json({ error : (error as Error).message }, { status: 500 });
    }
}
// /app/api/users/route.ts
import { NextResponse } from "next/server";
import {prisma2} from '@/../lib/prisma';



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // Calculate the starting index for the pagination
  const start = (page - 1) * limit;

  try {
    // Fetch paginated users from Prisma
    const users = await prisma2.user.findMany({
      skip: start,
      take: limit,
      orderBy: {
        points: "desc", // Order users by points in ascending order
      },
    });

    const userWithMostPoints   = await prisma2.user.findFirst({
      orderBy: {
        points: "desc", // Order users by points in ascending order
      },
    })
    // Get the total count of users in the database
    const totalUsers = await prisma2.user.count();

    return NextResponse.json({
      users,
      total: totalUsers,
      userWithMostPoints : userWithMostPoints
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

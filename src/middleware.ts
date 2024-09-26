// /middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Import NextRequest type

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  console.log("🚀 ~ middleware ~ token:", token)

  // If no token, redirect to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("https://new-admin-pannel-rho.vercel.app/auth/signin", req.url));
  }

  // Allow request to continue if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!auth|api|_next|favicon.ico).*)"], // Protect all routes except auth, api, static files
};

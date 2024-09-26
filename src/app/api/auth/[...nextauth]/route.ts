// /app/api/auth/[...nextauth]/route.ts
import NextAuth, { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & { id: string };
  }
}
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authPrisma } from "@/../lib/prisma"; // Use the prisma client for auth

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if the email and password are provided
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Fetch user by email using the prisma1 client
        const user = await authPrisma.user.findUnique({
          where: { email: credentials.email },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any ;

        // If no user or password is found, return null
        if (!user || !user.password) {
          return null;
        }

        // Compare the hashed password using bcrypt
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        // If valid, return the user object (without password)
        if (isValidPassword) {
          return {
            id: user.id,
            name: user.username, // Assuming user has a "name" field
            email: user.email,
          };
        }

        // If the password is incorrect, return null
        return null;
      },
    }),
  ],
  callbacks: {
    // Add user ID to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Add user ID to the session
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token } : { session: Session; token: any } ) {
      if (token?.id) {
        if (session.user) {
          session.user.id = token.id;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Using JWT for session handling
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env file
});

// Export both GET and POST handlers for NextAuth
export { handler as GET, handler as POST };

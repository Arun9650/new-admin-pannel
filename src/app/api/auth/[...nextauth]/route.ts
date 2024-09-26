import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma1 } from "@/../lib/prisma";
import bcrypt from "bcryptjs";

// Define the NextAuth configuration options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Return null if credentials are missing
        }

        // Fetch the user by email
        const user = await prisma1.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user or password is found, return null
        if (!user || !user.password) {
          return null;
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        // If the password is valid, return the user object
        if (isValidPassword) {
          return {
            id: user.id,
            name: user.username,
            email: user.email,
          };
        }

        // If the password is incorrect, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id; // Add user ID to the session
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT for session strategy
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure NEXTAUTH_SECRET is set in your .env file
};

// Define the handler using NextAuth and export for GET and POST
const handler = NextAuth(authOptions);

// Export both GET and POST for NextAuth
export { handler as GET, handler as POST };

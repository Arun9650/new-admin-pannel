// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma1} from "@/../lib/prisma";
import bcrypt from "bcryptjs";



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

        // Fetch user by email
        const user = await prisma1.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user is found or the password is undefined, return null
        if (!user || !user.password) {
          return null;
        }

        // Compare passwords and ensure both are strings
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        // If the password is valid, return the user object without the password
        if (isValidPassword) {
          return {
            id: user.id,
            name: user.username,
            email: user.email,
          };
        }

        // If password comparison fails, return null
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token;
    },
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-expect-error

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
    strategy: "jwt" as const, // Explicitly type session strategy as 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is correctly set in your .env file
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

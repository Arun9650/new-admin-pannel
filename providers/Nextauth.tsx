// components/Providers.tsx (or any suitable name)
"use client"; // Ensure this is a Client Component

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function NextAuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

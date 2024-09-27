'use client'
import { Button } from '@/components/ui/button';
// import { auth, signOut } from '@/lib/auth';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {  useSession } from "next-auth/react";

import { signOut } from "next-auth/react";
import { destroyCookie } from "nookies";
export  function User() {
//   let session = await auth();
//   let user = session?.user;
const { data: user } = useSession();


const handleLogout =  () => {
  destroyCookie(null, "__Secure-next-auth.session-token");
  destroyCookie(null, 'next-auth.session-token'); 
  destroyCookie(null, 'next-auth.csrf-token');
  // Sign out and redirect to the sign-in page
  signOut({
    callbackUrl: '/auth/signin',
  }).then(() => {
    // Clear localStorage/sessionStorage if needed
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={'https://github.com/shadcn.png'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <form
            //   action={async () => {
            //     'use server';
            //     await signOut();
            //   }}
            >
              <button type="submit" onClick={handleLogout}>Sign Out</button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

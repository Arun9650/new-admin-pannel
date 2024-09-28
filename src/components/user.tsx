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
import LogOutButton from './LogOutButton';

export  function User() {
//   let session = await auth();
//   let user = session?.user;
const { data: user } = useSession();




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
              {/* <button type="submit" onClick={handleLogout}>Sign Out</button> */}
              <LogOutButton/>
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

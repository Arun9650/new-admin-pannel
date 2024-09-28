
import { signOut } from 'next-auth/react';
import React from 'react'


const LogOutButton = () => {
    const handleLogout =  () => {
        'use server'
        const { cookies } = await import('header'); // Dynamically import cookies from header
        const cookieStore = cookies()
        // Sign out and redirect to the sign-in page
        signOut({
          callbackUrl: '/auth/signin',
        });
          
          cookieStore.delete('__Secure-next-auth.session-token');
        
      };
  return (
    <button onClick={handleLogout}>Sign Out</button>
  )
}

export default LogOutButton
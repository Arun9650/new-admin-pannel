
import { signOut } from 'next-auth/react';
import React from 'react'


const LogOutButton = () => {
    const handleLogout = async () => {
        // Sign out and redirect to the sign-in page
        signOut({
          callbackUrl: '/auth/signin',
        });
          
        
      };
  return (
    <button onClick={handleLogout}>Sign Out</button>
  )
}

export default LogOutButton
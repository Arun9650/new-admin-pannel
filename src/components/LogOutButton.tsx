import { signOut } from 'next-auth/react';
import React from 'react'

const LogOutButton = () => {
    const handleLogout =  () => {
 
        // Sign out and redirect to the sign-in page
        signOut({
          callbackUrl: '/auth/signin',
        });
          // Manually clear session-related cookies if necessary
          document.cookie = '__Secure-next-auth.session-token=; Max-Age=0; path=/; secure;';
          document.cookie = 'next-auth.session-token=; Max-Age=0; path=/;';
          document.cookie = 'next-auth.csrf-token=; Max-Age=0; path=/;';
        
          
        window.localStorage.clear();
        window.sessionStorage.clear();
        
      };
  return (
    <button onClick={handleLogout}>Sign Out</button>
  )
}

export default LogOutButton
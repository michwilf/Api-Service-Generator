'use client';

import { ThemeProvider } from "next-themes"
import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
       <SessionProvider>{children}</SessionProvider> 
        </ThemeProvider>
};
    
export default Providers;
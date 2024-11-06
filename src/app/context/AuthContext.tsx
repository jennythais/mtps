import { getTokenCookie } from '@/utils/token';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextType {
     isAuthenticated: boolean;
}

const defaultProvider: AuthContextType = {
     isAuthenticated: false,
};

type Props = {
     children: React.ReactNode;
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: Props) => {
     const router = useRouter();
     const pathname = usePathname().split("/")[1];
     const [loading, setLoading] = useState(true)
     const isAuthenticated = !!getTokenCookie();
     const handleRedirect = () => {
          if (!isAuthenticated && !['login', 'forgot-password', 'reset-password'].includes(pathname)) {
               router.replace('/login');
          } else {
               setLoading(false)
          }
     };

     useEffect(() => {
          handleRedirect();
     }, [isAuthenticated, pathname]);

     return (
          <AuthContext.Provider value={{ isAuthenticated }}>
               {children}
          </AuthContext.Provider>
     );
};

const AuthConsumer = AuthContext.Consumer;
export { AuthConsumer, AuthContext, AuthProvider };

import { useDispatch, useSelector } from '@/store';
import { userActions } from '@/store/me';
import { AppTypes } from '@/types';
import { getTokenCookie } from '@/utils/token';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextType {
     isAuthenticated: boolean;
     profile: AppTypes.User | null;
}

const defaultProvider: AuthContextType = {
     isAuthenticated: false,
     profile: null,
};

type Props = {
     children: React.ReactNode;
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: Props) => {
     const router = useRouter();
     const pathname = usePathname().split("/")[1];
     const [loading, setLoading] = useState(true)
     const [profile, setProfile] = useState<AppTypes.User | null>(null);
     const { user } = useSelector((state) => state.me);
     const dispatch = useDispatch();
     const isAuthenticated = !!getTokenCookie();
     useEffect(() => {
          const getProfile = () => {
               dispatch(userActions.getUser());
               if (user) {
                    dispatch(userActions.setUser(user));
               }
          }
          const handleRedirect = () => {
               if (typeof window !== 'undefined') {
                    if (!isAuthenticated && !['login', 'forgot-password', 'reset-password'].includes(pathname)) {
                         router.replace('/login');
                    } else {
                         if (isAuthenticated) {
                              getProfile();
                         } else {
                              setLoading(false);
                         }
                    }
               }
          };
          handleRedirect();
     }, [isAuthenticated, pathname]);

     return (
          <AuthContext.Provider value={{ isAuthenticated, profile }}>
               {children}
          </AuthContext.Provider>
     );
};

const AuthConsumer = AuthContext.Consumer;
export { AuthConsumer, AuthContext, AuthProvider };

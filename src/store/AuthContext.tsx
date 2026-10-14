import * as React from 'react';

import { authenticate, type AuthResult } from '@/lib/auth';
import type { CurrentUser } from '@/types';

type AuthContextValue = {
  user: CurrentUser | null;
  login: (username: string, password: string) => AuthResult;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<CurrentUser | null>(null);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      login: (username, password) => {
        const result = authenticate(username, password);
        if (result.ok) setUser(result.user);
        return result;
      },
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth phải dùng bên trong <AuthProvider>');
  return context;
}

import * as React from 'react';

import { AuthProvider } from './AuthContext';
import { ChatProvider } from './ChatContext';
import { NotificationProvider } from './NotificationContext';
import { PreferencesProvider } from './PreferencesContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <ChatProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </ChatProvider>
      </PreferencesProvider>
    </AuthProvider>
  );
}

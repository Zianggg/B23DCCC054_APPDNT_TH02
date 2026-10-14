import * as React from 'react';

import { NOTIFICATIONS } from '@/data/notifications';
import type { AppNotification } from '@/types';

import { notificationReducer } from './notificationReducer';

type NotificationContextValue = {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  toggleRead: (id: string) => void;
  markAllAsRead: () => void;
};

const NotificationContext =
  React.createContext<NotificationContextValue | null>(null);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, dispatch] = React.useReducer(
    notificationReducer,
    NOTIFICATIONS,
  );

  const value = React.useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter(item => !item.read).length,
      markAsRead: id => dispatch({ type: 'markRead', id }),
      toggleRead: id => dispatch({ type: 'toggleRead', id }),
      markAllAsRead: () => dispatch({ type: 'markAllRead' }),
    }),
    [notifications],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = React.useContext(NotificationContext);
  if (!context)
    throw new Error(
      'useNotifications phải dùng bên trong <NotificationProvider>',
    );
  return context;
}

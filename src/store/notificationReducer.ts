import type { AppNotification } from '@/types';

export type NotificationAction =
  | { type: 'markRead'; id: string }
  | { type: 'toggleRead'; id: string }
  | { type: 'markAllRead' };

export function notificationReducer(
  state: AppNotification[],
  action: NotificationAction,
): AppNotification[] {
  switch (action.type) {
    case 'markRead':
      if (!state.some(item => item.id === action.id && !item.read))
        return state;
      return state.map(item =>
        item.id === action.id ? { ...item, read: true } : item,
      );
    case 'toggleRead':
      return state.map(item =>
        item.id === action.id ? { ...item, read: !item.read } : item,
      );
    case 'markAllRead':
      if (state.every(item => item.read)) return state;
      return state.map(item => (item.read ? item : { ...item, read: true }));
    default:
      return state;
  }
}

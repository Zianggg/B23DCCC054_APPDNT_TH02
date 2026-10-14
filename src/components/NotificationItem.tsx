import {
  Bell,
  MessageCircle,
  ShieldCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from 'lucide-react-native';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { formatRelativeTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { AppNotification, NotificationType } from '@/types';

const TYPE_STYLE: Record<
  NotificationType,
  { icon: LucideIcon; bg: string; fg: string }
> = {
  message: { icon: MessageCircle, bg: 'bg-blue-500/15', fg: 'text-blue-500' },
  friend: { icon: UserPlus, bg: 'bg-emerald-500/15', fg: 'text-emerald-500' },
  group: { icon: Users, bg: 'bg-violet-500/15', fg: 'text-violet-500' },
  system: { icon: Bell, bg: 'bg-amber-500/15', fg: 'text-amber-500' },
  security: { icon: ShieldCheck, bg: 'bg-rose-500/15', fg: 'text-rose-500' },
};

type NotificationItemProps = {
  notification: AppNotification;
  onPress: (id: string) => void;
  onLongPress: (id: string) => void;
};

function NotificationItemBase({
  notification,
  onPress,
  onLongPress,
}: NotificationItemProps) {
  const { icon, bg, fg } = TYPE_STYLE[notification.type];
  const unread = !notification.read;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(notification.id)}
      onLongPress={() => onLongPress(notification.id)}
      accessibilityRole="button"
      accessibilityState={{ selected: unread }}
      accessibilityHint={
        unread ? 'Chạm để đánh dấu đã đọc' : 'Nhấn giữ để đánh dấu chưa đọc'
      }
      className={cn('flex-row gap-3 px-4 py-3.5', unread && 'bg-primary/5')}
    >
      <View
        className={cn('size-11 items-center justify-center rounded-full', bg)}
      >
        <Icon as={icon} size={20} className={fg} />
      </View>
      <View className="flex-1 gap-1">
        <Text
          className={cn(
            'text-[15px] leading-5',
            unread ? 'font-semibold' : 'text-muted-foreground',
          )}
        >
          {notification.content}
        </Text>
        <View className="flex-row items-center gap-1.5">
          <Text
            className={cn(
              'text-xs',
              unread ? 'font-medium text-primary' : 'text-muted-foreground',
            )}
          >
            {formatRelativeTime(notification.createdAt)}
          </Text>
          <Text className="text-xs text-muted-foreground">·</Text>
          <Text
            className={cn(
              'text-xs',
              unread ? 'font-medium text-primary' : 'text-muted-foreground',
            )}
          >
            {unread ? 'Chưa đọc' : 'Đã đọc'}
          </Text>
        </View>
      </View>
      <View className="w-3 items-center pt-1.5">
        {unread ? <View className="size-2.5 rounded-full bg-primary" /> : null}
      </View>
    </TouchableOpacity>
  );
}

export const NotificationItem = React.memo(NotificationItemBase);

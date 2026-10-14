import { MessageCircle } from 'lucide-react-native';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { UserAvatar } from '@/components/UserAvatar';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { formatPresence } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

type ContactItemProps = {
  user: User;
  onPress: (userId: string) => void;
};

function ContactItemBase({ user, onPress }: ContactItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(user.id)}
      accessibilityRole="button"
      accessibilityLabel={`Nhắn tin cho ${user.name}`}
      className="flex-row items-center gap-3 px-4 py-2.5"
    >
      <UserAvatar name={user.name} online={user.online} size="md" />
      <View className="flex-1 gap-0.5">
        <Text numberOfLines={1} className="text-base font-semibold">
          {user.name}
        </Text>
        <View className="flex-row items-center gap-1.5">
          <View
            className={cn(
              'size-2 rounded-full',
              user.online ? 'bg-online' : 'bg-muted-foreground/40',
            )}
          />
          <Text
            className={cn(
              'text-sm',
              user.online ? 'text-online' : 'text-muted-foreground',
            )}
          >
            {formatPresence(user.online, user.lastSeen)}
          </Text>
        </View>
      </View>
      <View className="size-9 items-center justify-center rounded-full bg-primary/10">
        <Icon as={MessageCircle} size={18} className="text-primary" />
      </View>
    </TouchableOpacity>
  );
}

export const ContactItem = React.memo(ContactItemBase);

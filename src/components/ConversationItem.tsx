import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { UserAvatar } from '@/components/UserAvatar';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { ME_ID } from '@/data/accounts';
import { USERS_BY_ID } from '@/data/users';
import { formatChatTime } from '@/lib/format';
import { cn } from '@/lib/utils';
import { lastMessageOf } from '@/store/chatReducer';
import type { Conversation } from '@/types';

type ConversationItemProps = {
  conversation: Conversation;
  isTyping: boolean;
  onPress: (conversationId: string) => void;
};

function ConversationItemBase({
  conversation,
  isTyping,
  onPress,
}: ConversationItemProps) {
  const user = USERS_BY_ID[conversation.userId];
  const last = lastMessageOf(conversation);
  const unread = conversation.unreadCount;
  const hasUnread = unread > 0;

  let preview = last ? last.text : 'Chưa có tin nhắn';
  if (last?.senderId === ME_ID) preview = `Bạn: ${preview}`;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(conversation.id)}
      accessibilityRole="button"
      accessibilityLabel={`Trò chuyện với ${user.name}${
        hasUnread ? `, ${unread} tin nhắn chưa đọc` : ''
      }`}
      className="flex-row items-center gap-3 px-4 py-3"
    >
      <UserAvatar name={user.name} online={user.online} size="lg" />
      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text
            numberOfLines={1}
            className={cn(
              'flex-1 text-base',
              hasUnread ? 'font-bold' : 'font-semibold',
            )}
          >
            {user.name}
          </Text>
          {last ? (
            <Text
              className={cn(
                'text-xs',
                hasUnread
                  ? 'font-semibold text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {formatChatTime(last.createdAt)}
            </Text>
          ) : null}
        </View>
        <View className="flex-row items-center gap-2">
          {isTyping ? (
            <Text
              numberOfLines={1}
              className="flex-1 text-sm italic text-primary"
            >
              Đang soạn tin...
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              className={cn(
                'flex-1 text-sm',
                hasUnread
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              {preview}
            </Text>
          )}
          {hasUnread ? (
            <Badge className="h-5 min-w-5 px-1.5 py-0">
              <Text>{unread > 99 ? '99+' : unread}</Text>
            </Badge>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const ConversationItem = React.memo(ConversationItemBase);

import { useFocusEffect } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { SendHorizontal } from 'lucide-react-native';
import * as React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { MessageBubble } from '@/components/MessageBubble';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ME_ID } from '@/data/accounts';
import { USERS_BY_ID } from '@/data/users';
import { useThemeColors } from '@/hooks/useThemeColors';
import { formatPresence } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { RootStackScreenProps } from '@/navigation/types';
import { useChatActions, useChatState } from '@/store/ChatContext';
import type { Message } from '@/types';

const keyExtractor = (item: Message) => item.id;

/** Tiêu đề header: ảnh đại diện + tên + trạng thái (đang hoạt động / đang soạn tin). */
export function ChatHeaderTitle({
  conversationId,
}: {
  conversationId: string;
}) {
  const { conversations, typing } = useChatState();
  const conversation = conversations.find(item => item.id === conversationId);
  if (!conversation) return null;
  const user = USERS_BY_ID[conversation.userId];
  const isTyping = !!typing[conversationId];

  return (
    <View className="flex-row items-center gap-3">
      <UserAvatar name={user.name} online={user.online} size="sm" />
      <View>
        <Text numberOfLines={1} className="text-base font-semibold">
          {user.name}
        </Text>
        <Text
          className={cn(
            'text-xs',
            isTyping || user.online ? 'text-online' : 'text-muted-foreground',
          )}
        >
          {isTyping
            ? 'Đang soạn tin...'
            : formatPresence(user.online, user.lastSeen)}
        </Text>
      </View>
    </View>
  );
}

export function ChatScreen({ route }: RootStackScreenProps<'Chat'>) {
  const { conversationId } = route.params;
  const { conversations, typing } = useChatState();
  const { sendMessage, markAsRead, setActiveConversation } = useChatActions();
  const { colors } = useThemeColors();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const [draft, setDraft] = React.useState('');
  const listRef = React.useRef<FlatList<Message>>(null);

  const conversation = conversations.find(item => item.id === conversationId);
  const user = conversation ? USERS_BY_ID[conversation.userId] : undefined;

  // Mở màn hình = đã đọc; trong lúc đang mở, tin nhắn mới đến không bị tính là chưa đọc.
  useFocusEffect(
    React.useCallback(() => {
      setActiveConversation(conversationId);
      markAsRead(conversationId);
      return () => setActiveConversation(null);
    }, [conversationId, markAsRead, setActiveConversation]),
  );

  // FlatList đảo ngược: tin mới nhất ở cuối màn hình, tự bám đáy khi có tin mới.
  const data = React.useMemo(
    () => (conversation ? [...conversation.messages].reverse() : []),
    [conversation],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Message }) => (
      <MessageBubble message={item} isMine={item.senderId === ME_ID} />
    ),
    [],
  );

  const canSend = draft.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    sendMessage(conversationId, draft);
    setDraft('');
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  if (!conversation || !user) {
    return (
      <View className="flex-1 bg-background">
        <EmptyState
          icon={SendHorizontal}
          title="Không tìm thấy cuộc trò chuyện"
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
    >
      <FlatList
        ref={listRef}
        inverted
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerClassName="px-3 py-3"
        ListHeaderComponent={
          typing[conversationId] ? (
            <View className="my-1 self-start rounded-2xl rounded-bl-md bg-muted px-4 py-2.5">
              <Text className="text-sm italic text-muted-foreground">
                {user.name} đang soạn tin...
              </Text>
            </View>
          ) : undefined
        }
        ListFooterComponent={
          <View className="items-center gap-2 pb-4 pt-6">
            <UserAvatar name={user.name} size="xl" />
            <Text className="text-lg font-semibold">{user.name}</Text>
            <Text className="text-sm text-muted-foreground">
              {data.length === 0
                ? 'Hãy gửi lời chào để bắt đầu trò chuyện 👋'
                : user.phone}
            </Text>
          </View>
        }
      />

      <View
        className="flex-row items-end gap-2 border-t border-border bg-background px-3 pt-2"
        style={{ paddingBottom: Math.max(insets.bottom, 8) }}
      >
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={colors.mutedForeground}
          multiline
          accessibilityLabel="Nội dung tin nhắn"
          className="max-h-28 min-h-11 flex-1 rounded-3xl bg-muted px-4 py-2.5 text-base text-foreground"
        />
        <Button
          size="icon"
          className="size-11 rounded-full sm:size-11"
          disabled={!canSend}
          onPress={handleSend}
          accessibilityLabel="Gửi tin nhắn"
        >
          <Icon
            as={SendHorizontal}
            size={20}
            className="text-primary-foreground"
          />
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

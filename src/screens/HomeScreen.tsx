import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { MessageCircleOff, SquarePen } from 'lucide-react-native';
import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { ConversationItem } from '@/components/ConversationItem';
import { EmptyState } from '@/components/EmptyState';
import { SearchBar } from '@/components/SearchBar';
import { UserAvatar } from '@/components/UserAvatar';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { USERS, USERS_BY_ID } from '@/data/users';
import { matchesSearch } from '@/lib/format';
import type { MainTabParamList, MainTabScreenProps } from '@/navigation/types';
import { lastMessageOf } from '@/store/chatReducer';
import { useChatActions, useChatState } from '@/store/ChatContext';
import type { Conversation, User } from '@/types';

const ONLINE_USERS = USERS.filter(user => user.online);

const keyExtractor = (item: Conversation) => item.id;
const userKeyExtractor = (item: User) => item.id;

/** Nút soạn tin mới ở header (gắn qua options của tab Home) → chọn người trong Danh bạ. */
export function NewChatHeaderButton() {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList, 'Home'>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Contacts')}
      accessibilityRole="button"
      accessibilityLabel="Tin nhắn mới"
      hitSlop={8}
      className="mr-4 size-10 items-center justify-center rounded-full bg-muted"
    >
      <Icon as={SquarePen} size={20} />
    </TouchableOpacity>
  );
}

export function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { sortedConversations, typing } = useChatState();
  const { openConversationWithUser } = useChatActions();
  const [query, setQuery] = React.useState('');

  const conversations = React.useMemo(
    () =>
      sortedConversations.filter(item =>
        matchesSearch(
          query,
          USERS_BY_ID[item.userId].name,
          lastMessageOf(item)?.text ?? '',
        ),
      ),
    [sortedConversations, query],
  );

  const openConversation = React.useCallback(
    (conversationId: string) => navigation.navigate('Chat', { conversationId }),
    [navigation],
  );

  const openWithUser = React.useCallback(
    (userId: string) => openConversation(openConversationWithUser(userId)),
    [openConversation, openConversationWithUser],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Conversation }) => (
      <ConversationItem
        conversation={item}
        isTyping={!!typing[item.id]}
        onPress={openConversation}
      />
    ),
    [openConversation, typing],
  );

  const renderOnlineUser = React.useCallback(
    ({ item }: { item: User }) => (
      <TouchableOpacity
        onPress={() => openWithUser(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`Nhắn tin cho ${item.name}`}
        className="w-16 items-center gap-1.5"
      >
        <UserAvatar name={item.name} online size="lg" />
        <Text numberOfLines={1} className="text-xs text-muted-foreground">
          {item.name.split(' ').pop()}
        </Text>
      </TouchableOpacity>
    ),
    [openWithUser],
  );

  const searching = query.trim().length > 0;

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={conversations}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerClassName="pb-6"
        ListHeaderComponent={
          <View className="gap-4 pb-2 pt-1">
            <SearchBar
              value={query}
              onChangeText={setQuery}
              placeholder="Tìm cuộc trò chuyện"
              className="mx-4"
            />
            {searching ? (
              <Text className="mx-4 text-sm text-muted-foreground">
                {conversations.length} kết quả cho “{query.trim()}”
              </Text>
            ) : (
              <FlatList
                horizontal
                data={ONLINE_USERS}
                keyExtractor={userKeyExtractor}
                renderItem={renderOnlineUser}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-3 px-4"
              />
            )}
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon={MessageCircleOff}
            title={
              searching
                ? 'Không tìm thấy cuộc trò chuyện'
                : 'Chưa có cuộc trò chuyện'
            }
            description={
              searching
                ? 'Thử tìm bằng tên người dùng hoặc nội dung tin nhắn khác.'
                : 'Vào Danh bạ để bắt đầu trò chuyện với bạn bè.'
            }
          />
        }
      />
    </View>
  );
}

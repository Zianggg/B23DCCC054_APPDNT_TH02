import { UserSearch } from 'lucide-react-native';
import * as React from 'react';
import { FlatList, View } from 'react-native';

import { ContactItem } from '@/components/ContactItem';
import { EmptyState } from '@/components/EmptyState';
import { FilterTabs } from '@/components/FilterTabs';
import { SearchBar } from '@/components/SearchBar';
import { Text } from '@/components/ui/text';
import { USERS } from '@/data/users';
import { matchesSearch } from '@/lib/format';
import type { MainTabScreenProps } from '@/navigation/types';
import { useChatActions } from '@/store/ChatContext';
import type { User } from '@/types';

type Filter = 'all' | 'online';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'online', label: 'Đang hoạt động' },
];

// Đang hoạt động lên trước, sau đó theo tên (A → Z, có dấu tiếng Việt).
const SORTED_USERS = [...USERS].sort(
  (a, b) =>
    Number(b.online) - Number(a.online) || a.name.localeCompare(b.name, 'vi'),
);
const ONLINE_COUNT = USERS.filter(user => user.online).length;

const keyExtractor = (item: User) => item.id;

export function ContactsScreen({ navigation }: MainTabScreenProps<'Contacts'>) {
  const { openConversationWithUser } = useChatActions();
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<Filter>('all');

  const contacts = React.useMemo(
    () =>
      SORTED_USERS.filter(
        user =>
          (filter === 'all' || user.online) &&
          matchesSearch(query, user.name, user.phone),
      ),
    [query, filter],
  );

  const openChat = React.useCallback(
    (userId: string) => {
      const conversationId = openConversationWithUser(userId);
      navigation.navigate('Chat', { conversationId });
    },
    [navigation, openConversationWithUser],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: User }) => (
      <ContactItem user={item} onPress={openChat} />
    ),
    [openChat],
  );

  return (
    <View className="flex-1 bg-background">
      <View className="gap-3 px-4 pb-3 pt-1">
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm theo tên hoặc số điện thoại"
        />
        <FilterTabs value={filter} onChange={setFilter} options={FILTERS} />
        <Text className="text-sm text-muted-foreground">
          {contacts.length} liên hệ · {ONLINE_COUNT} đang hoạt động
        </Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerClassName="pb-6"
        ListEmptyComponent={
          <EmptyState
            icon={UserSearch}
            title="Không tìm thấy liên hệ"
            description="Kiểm tra lại tên hoặc số điện thoại bạn nhập."
          />
        }
      />
    </View>
  );
}

import { BellOff, CheckCheck } from 'lucide-react-native';
import * as React from 'react';
import { FlatList, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { FilterTabs } from '@/components/FilterTabs';
import { NotificationItem } from '@/components/NotificationItem';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useNotifications } from '@/store/NotificationContext';
import type { AppNotification } from '@/types';

type Filter = 'all' | 'unread';

const keyExtractor = (item: AppNotification) => item.id;
const ItemSeparator = () => <Separator className="ml-[72px] w-auto" />;

export function NotificationsScreen() {
  const { notifications, unreadCount, markAsRead, toggleRead, markAllAsRead } =
    useNotifications();
  const [filter, setFilter] = React.useState<Filter>('all');

  const data = React.useMemo(
    () =>
      filter === 'unread'
        ? notifications.filter(item => !item.read)
        : notifications,
    [notifications, filter],
  );

  const filters = React.useMemo(
    () => [
      { value: 'all' as const, label: `Tất cả (${notifications.length})` },
      { value: 'unread' as const, label: `Chưa đọc (${unreadCount})` },
    ],
    [notifications.length, unreadCount],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: AppNotification }) => (
      <NotificationItem
        notification={item}
        onPress={markAsRead}
        onLongPress={toggleRead}
      />
    ),
    [markAsRead, toggleRead],
  );

  return (
    <View className="flex-1 bg-background">
      <View className="gap-3 px-4 pb-3 pt-1">
        <View className="flex-row items-center justify-between gap-3">
          <Text className="flex-1 text-sm text-muted-foreground">
            {unreadCount > 0
              ? `Bạn có ${unreadCount} thông báo chưa đọc`
              : 'Bạn đã đọc hết thông báo'}
          </Text>
          <Button
            variant="outline"
            size="sm"
            disabled={unreadCount === 0}
            onPress={markAllAsRead}
          >
            <Icon as={CheckCheck} size={16} />
            <Text>Đọc tất cả</Text>
          </Button>
        </View>
        <FilterTabs value={filter} onChange={setFilter} options={filters} />
      </View>
      <Separator />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerClassName="pb-6"
        ListFooterComponent={
          data.length > 0 ? (
            <Text className="px-6 pt-4 text-center text-xs text-muted-foreground">
              Chạm để đánh dấu đã đọc · Nhấn giữ để đổi trạng thái đã đọc/chưa
              đọc
            </Text>
          ) : undefined
        }
        ListEmptyComponent={
          <EmptyState
            icon={BellOff}
            title={
              filter === 'unread'
                ? 'Không còn thông báo chưa đọc'
                : 'Chưa có thông báo'
            }
            description={
              filter === 'unread'
                ? 'Tuyệt vời! Bạn đã xem hết mọi thông báo.'
                : undefined
            }
          />
        }
      />
    </View>
  );
}

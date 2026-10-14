import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <View className="items-center justify-center gap-3 px-8 py-16">
      <View className="size-16 items-center justify-center rounded-full bg-muted">
        <Icon as={icon} size={28} className="text-muted-foreground" />
      </View>
      <Text className="text-center text-base font-semibold">{title}</Text>
      {description ? (
        <Text className="text-center text-sm text-muted-foreground">
          {description}
        </Text>
      ) : null}
    </View>
  );
}

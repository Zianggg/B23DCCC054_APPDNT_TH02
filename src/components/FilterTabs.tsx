import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type FilterTabsProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  className?: string;
};

/** Bộ lọc dạng nút bo tròn (Tất cả / Chưa đọc …). */
export function FilterTabs<T extends string>({
  value,
  onChange,
  options,
  className,
}: FilterTabsProps<T>) {
  return (
    <View className={cn('flex-row gap-2', className)}>
      {options.map(option => {
        const active = option.value === value;
        return (
          <Button
            key={option.value}
            size="sm"
            variant={active ? 'default' : 'secondary'}
            className="h-8 rounded-full px-4 sm:h-8"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
          >
            <Text>{option.label}</Text>
          </Button>
        );
      })}
    </View>
  );
}

import { Search, X } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Tìm kiếm',
  className,
}: SearchBarProps) {
  return (
    <View className={cn('relative justify-center', className)}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="search"
        autoCorrect={false}
        className="h-11 rounded-full border-transparent bg-muted pl-10 pr-10 shadow-none sm:h-11 dark:bg-muted"
      />
      <View pointerEvents="none" className="absolute left-3.5">
        <Icon as={Search} size={18} className="text-muted-foreground" />
      </View>
      {value ? (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Xoá nội dung tìm kiếm"
          hitSlop={8}
          className="absolute right-3 rounded-full bg-muted-foreground/20 p-1"
        >
          <Icon as={X} size={14} className="text-muted-foreground" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

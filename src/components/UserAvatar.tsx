import { UserRound } from 'lucide-react-native';
import { View } from 'react-native';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const SIZES = {
  sm: { avatar: 'size-10', dot: 'size-3', icon: 20 },
  md: { avatar: 'size-12', dot: 'size-3.5', icon: 24 },
  lg: { avatar: 'size-14', dot: 'size-4', icon: 28 },
  xl: { avatar: 'size-24', dot: 'size-5', icon: 48 },
} as const;

/** Bảng màu nền/icon; mỗi người nhận một màu cố định theo tên. */
const COLORS = [
  { bg: 'bg-blue-500/15', fg: 'text-blue-500' },
  { bg: 'bg-emerald-500/15', fg: 'text-emerald-500' },
  { bg: 'bg-violet-500/15', fg: 'text-violet-500' },
  { bg: 'bg-amber-500/15', fg: 'text-amber-500' },
  { bg: 'bg-rose-500/15', fg: 'text-rose-500' },
  { bg: 'bg-cyan-500/15', fg: 'text-cyan-500' },
  { bg: 'bg-orange-500/15', fg: 'text-orange-500' },
  { bg: 'bg-pink-500/15', fg: 'text-pink-500' },
];

const colorOf = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 1_000_003;
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

type UserAvatarProps = {
  name: string;
  size?: keyof typeof SIZES;
  /** Hiện chấm xanh khi đang hoạt động. */
  online?: boolean;
  className?: string;
};

/** Avatar dạng icon (RNR Avatar + icon người dùng), màu nền theo tên. */
export function UserAvatar({
  name,
  size = 'md',
  online = false,
  className,
}: UserAvatarProps) {
  const s = SIZES[size];
  const color = colorOf(name);
  return (
    <View className={cn('relative', className)}>
      <Avatar alt={`Ảnh đại diện của ${name}`} className={s.avatar}>
        <AvatarFallback className={color.bg}>
          <Icon as={UserRound} size={s.icon} className={color.fg} />
        </AvatarFallback>
      </Avatar>
      {online ? (
        <View
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background bg-online',
            s.dot,
          )}
        />
      ) : null}
    </View>
  );
}

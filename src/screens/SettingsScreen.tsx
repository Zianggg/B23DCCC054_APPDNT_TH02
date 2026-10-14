import {
  AtSign,
  BellDot,
  CalendarDays,
  CircleDot,
  GraduationCap,
  LogOut,
  Mail,
  Moon,
  Phone,
  type LucideIcon,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ScrollView, Switch, View } from 'react-native';

import { UserAvatar } from '@/components/UserAvatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/useThemeColors';
import { APP_NAME, APP_VERSION } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/AuthContext';
import { usePreferences } from '@/store/PreferencesContext';

function SectionTitle({ children }: { children: string }) {
  return (
    <Text className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </Text>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <View className="size-9 items-center justify-center rounded-full bg-primary/10">
        <Icon as={icon} size={18} className="text-primary" />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-muted-foreground">{label}</Text>
        <Text className="text-[15px] font-medium">{value}</Text>
      </View>
    </View>
  );
}

function SwitchRow({
  icon,
  label,
  description,
  value,
  onValueChange,
}: {
  icon: LucideIcon;
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  const { colors } = useThemeColors();
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <View className="size-9 items-center justify-center rounded-full bg-muted">
        <Icon as={icon} size={18} />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-medium">{label}</Text>
        <Text className="text-xs text-muted-foreground">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        accessibilityLabel={label}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#ffffff"
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}

export function SettingsScreen() {
  const { user, logout } = useAuth();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { showBadges, showOnlineStatus, setPreference } = usePreferences();

  if (!user) return null;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-6 px-4 pb-10 pt-2"
    >
      <Card className="items-center gap-3 py-6">
        <UserAvatar name={user.name} size="xl" online={showOnlineStatus} />
        <View className="items-center gap-1">
          <Text className="text-xl font-bold">{user.name}</Text>
          <Text className="text-sm text-muted-foreground">
            @{user.username}
          </Text>
        </View>
        <Badge
          variant={showOnlineStatus ? 'default' : 'secondary'}
          className={cn(showOnlineStatus && 'bg-online')}
        >
          <Text className={cn(showOnlineStatus && 'text-white')}>
            {showOnlineStatus ? 'Đang hoạt động' : 'Đã ẩn trạng thái hoạt động'}
          </Text>
        </Badge>
      </Card>

      <View className="gap-2">
        <SectionTitle>Thông tin tài khoản</SectionTitle>
        <Card className="gap-0 py-1">
          <InfoRow icon={AtSign} label="Tên đăng nhập" value={user.username} />
          <Separator className="ml-16 w-auto" />
          <InfoRow
            icon={GraduationCap}
            label="Mã sinh viên"
            value={user.studentId}
          />
          <Separator className="ml-16 w-auto" />
          <InfoRow icon={Mail} label="Email" value={user.email} />
          <Separator className="ml-16 w-auto" />
          <InfoRow icon={Phone} label="Số điện thoại" value={user.phone} />
          <Separator className="ml-16 w-auto" />
          <InfoRow
            icon={CalendarDays}
            label="Ngày tham gia"
            value={formatDate(user.joinedAt)}
          />
        </Card>
      </View>

      <View className="gap-2">
        <SectionTitle>Tuỳ chọn</SectionTitle>
        <Card className="gap-0 py-1">
          <SwitchRow
            icon={Moon}
            label="Chế độ tối"
            description="Đổi giao diện sáng / tối"
            value={colorScheme === 'dark'}
            onValueChange={value => setColorScheme(value ? 'dark' : 'light')}
          />
          <Separator className="ml-16 w-auto" />
          <SwitchRow
            icon={BellDot}
            label="Hiện số chưa đọc"
            description="Huy hiệu trên tab Tin nhắn và Thông báo"
            value={showBadges}
            onValueChange={value => setPreference('showBadges', value)}
          />
          <Separator className="ml-16 w-auto" />
          <SwitchRow
            icon={CircleDot}
            label="Trạng thái hoạt động"
            description="Cho bạn bè thấy khi bạn đang online"
            value={showOnlineStatus}
            onValueChange={value => setPreference('showOnlineStatus', value)}
          />
        </Card>
      </View>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="lg" className="h-12 sm:h-12">
            <Icon as={LogOut} size={18} className="text-white" />
            <Text className="text-base font-semibold">Đăng xuất</Text>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đăng xuất khỏi {APP_NAME}?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sẽ quay lại màn hình đăng nhập và cần nhập lại tài khoản để
              tiếp tục trò chuyện.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Huỷ</Text>
            </AlertDialogCancel>
            <AlertDialogAction className="bg-destructive" onPress={logout}>
              <Text className="text-white">Đăng xuất</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Text className="text-center text-xs text-muted-foreground">
        {APP_NAME} phiên bản {APP_VERSION} · React Native + React Navigation +
        RN Reusables
      </Text>
    </ScrollView>
  );
}

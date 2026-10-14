import { useColorScheme } from 'nativewind';

import { THEME } from '@/lib/theme';

/** Trả về bảng màu theo chế độ sáng/tối hiện tại (do NativeWind quản lý). */
export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return { isDark, colors: isDark ? THEME.dark : THEME.light };
}

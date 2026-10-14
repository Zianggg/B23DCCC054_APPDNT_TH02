import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

/**
 * Bảng màu dạng chuỗi cho những chỗ không dùng được className
 * (theme của React Navigation, icon tab, Switch, ActivityIndicator).
 * Giữ đồng bộ với biến CSS trong global.css.
 */
export const THEME = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    card: 'hsl(0 0% 100%)',
    primary: 'hsl(221.2 83.2% 53.3%)',
    primaryForeground: 'hsl(210 40% 98%)',
    muted: 'hsl(210 40% 96.1%)',
    mutedForeground: 'hsl(215.4 16.3% 46.9%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    border: 'hsl(214.3 31.8% 91.4%)',
    online: 'hsl(142.1 70.6% 45.3%)',
  },
  dark: {
    background: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',
    card: 'hsl(222.2 84% 4.9%)',
    primary: 'hsl(217.2 91.2% 59.8%)',
    primaryForeground: 'hsl(222.2 47.4% 11.2%)',
    muted: 'hsl(217.2 32.6% 17.5%)',
    mutedForeground: 'hsl(215 20.2% 65.1%)',
    destructive: 'hsl(0 62.8% 30.6%)',
    border: 'hsl(217.2 32.6% 17.5%)',
    online: 'hsl(142.1 70.6% 45.3%)',
  },
};

export type ThemeColors = (typeof THEME)['light'];

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: 'hsl(0 72.2% 50.6%)',
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Bell,
  ContactRound,
  MessageCircle,
  Settings,
} from 'lucide-react-native';

import { useThemeColors } from '@/hooks/useThemeColors';
import { ContactsScreen } from '@/screens/ContactsScreen';
import { HomeScreen, NewChatHeaderButton } from '@/screens/HomeScreen';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { useChatState } from '@/store/ChatContext';
import { useNotifications } from '@/store/NotificationContext';
import { usePreferences } from '@/store/PreferencesContext';

import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = { color: string; size: number };

const HomeIcon = ({ color, size }: TabIconProps) => (
  <MessageCircle color={color} size={size} />
);
const ContactsIcon = ({ color, size }: TabIconProps) => (
  <ContactRound color={color} size={size} />
);
const NotificationsIcon = ({ color, size }: TabIconProps) => (
  <Bell color={color} size={size} />
);
const SettingsIcon = ({ color, size }: TabIconProps) => (
  <Settings color={color} size={size} />
);

const badge = (count: number, visible: boolean) =>
  visible && count > 0 ? (count > 99 ? '99+' : count) : undefined;

export function MainTabs() {
  const { colors } = useThemeColors();
  const { totalUnread } = useChatState();
  const { unreadCount } = useNotifications();
  const { showBadges } = usePreferences();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarBadgeStyle: { fontSize: 10 },
        headerTitleStyle: { fontSize: 20, fontWeight: '700' },
        headerTitleAlign: 'left',
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Đoạn chat',
          tabBarLabel: 'Tin nhắn',
          headerRight: NewChatHeaderButton,
          tabBarIcon: HomeIcon,
          tabBarBadge: badge(totalUnread, showBadges),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: 'Danh bạ', tabBarIcon: ContactsIcon }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Thông báo',
          tabBarIcon: NotificationsIcon,
          tabBarBadge: badge(unreadCount, showBadges),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Cài đặt', tabBarIcon: SettingsIcon }}
      />
    </Tab.Navigator>
  );
}

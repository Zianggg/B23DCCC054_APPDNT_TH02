import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { ChatHeaderTitle, ChatScreen } from '@/screens/ChatScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { useAuth } from '@/store/AuthContext';

import { MainTabs } from './MainTabs';
import type { RootStackParamList, RootStackScreenProps } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const chatOptions = ({
  route,
}: RootStackScreenProps<'Chat'>): NativeStackNavigationOptions => ({
  headerTitle: () => (
    <ChatHeaderTitle conversationId={route.params.conversationId} />
  ),
  headerBackButtonDisplayMode: 'minimal',
  headerShadowVisible: true,
});

/**
 * Luồng xác thực theo kiểu "conditional screens" của React Navigation:
 * chưa đăng nhập chỉ có màn Login; đăng nhập xong stack đổi sang Main (tab Home đầu tiên),
 * đăng xuất thì tự quay về Login.
 */
export function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={chatOptions}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false, animationTypeForReplace: 'pop' }}
        />
      )}
    </Stack.Navigator>
  );
}

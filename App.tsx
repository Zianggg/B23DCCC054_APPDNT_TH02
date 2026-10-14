import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useThemeColors } from '@/hooks/useThemeColors';
import { NAV_THEME } from '@/lib/theme';
import { RootNavigator } from '@/navigation/RootNavigator';
import { AppProviders } from '@/store/AppProviders';

function AppShell() {
  const { isDark } = useThemeColors();

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={NAV_THEME[isDark ? 'dark' : 'light']}>
        <RootNavigator />
      </NavigationContainer>
      {/* Nơi AlertDialog của RN Reusables render ra (phải nằm cuối cây). */}
      <PortalHost />
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <AppShell />
      </AppProviders>
    </SafeAreaProvider>
  );
}

export default App;

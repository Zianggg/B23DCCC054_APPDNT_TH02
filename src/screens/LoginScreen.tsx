import { CircleAlert, Eye, EyeOff, Lock, User } from 'lucide-react-native';
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  type TextInputInstance,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import logo from '@/assets/images/logo.png';
import { DEMO_ACCOUNT } from '@/data/accounts';
import { useThemeColors } from '@/hooks/useThemeColors';
import { validateLogin, type LoginErrors } from '@/lib/auth';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/store/AuthContext';

export function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useThemeColors();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<LoginErrors>({});
  const [formError, setFormError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const usernameRef = React.useRef<TextInputInstance>(null);
  const passwordRef = React.useRef<TextInputInstance>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleLogin = () => {
    if (loading) return;
    const nextErrors = validateLogin(username, password);
    setErrors(nextErrors);
    setFormError('');
    if (nextErrors.username || nextErrors.password) return;

    setLoading(true);
    // Giả lập gọi máy chủ một chút cho có cảm giác thật.
    timerRef.current = setTimeout(() => {
      const result = login(username, password);
      if (!result.ok) {
        setFormError(result.error);
        setLoading(false);
      }
      // Thành công: RootNavigator tự chuyển sang màn Home.
    }, 600);
  };

  const fillDemoAccount = () => {
    setUsername(DEMO_ACCOUNT.username);
    setPassword(DEMO_ACCOUNT.password);
    setErrors({});
    setFormError('');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow justify-center gap-8 px-6 py-10"
        >
          <View className="items-center gap-3">
            <Image
              source={logo}
              className="size-20"
              accessibilityIgnoresInvertColors
            />
            <Text className="text-4xl font-extrabold tracking-tight text-foreground">
              {APP_NAME}
            </Text>
            <Text className="text-center text-muted-foreground">
              Kết nối và trò chuyện với bạn bè mọi lúc, mọi nơi
            </Text>
          </View>

          <Card className="gap-5 py-6">
            <CardContent className="gap-5">
              <View className="gap-2">
                <Label
                  nativeID="username-label"
                  onPress={() => usernameRef.current?.focus()}
                >
                  Tài khoản
                </Label>
                <View className="relative justify-center">
                  <Input
                    ref={usernameRef}
                    aria-labelledby="username-label"
                    value={username}
                    onChangeText={text => {
                      setUsername(text);
                      if (errors.username)
                        setErrors(prev => ({ ...prev, username: undefined }));
                    }}
                    placeholder="Nhập tài khoản"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="username"
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    className={cn(
                      'h-12 pl-10 sm:h-12',
                      errors.username && 'border-destructive',
                    )}
                  />
                  <View pointerEvents="none" className="absolute left-3">
                    <Icon
                      as={User}
                      size={18}
                      className="text-muted-foreground"
                    />
                  </View>
                </View>
                {errors.username ? (
                  <FieldError message={errors.username} />
                ) : null}
              </View>

              <View className="gap-2">
                <Label
                  nativeID="password-label"
                  onPress={() => passwordRef.current?.focus()}
                >
                  Mật khẩu
                </Label>
                <View className="relative justify-center">
                  <Input
                    ref={passwordRef}
                    aria-labelledby="password-label"
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      if (errors.password)
                        setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    returnKeyType="go"
                    onSubmitEditing={handleLogin}
                    className={cn(
                      'h-12 pl-10 pr-12 sm:h-12',
                      errors.password && 'border-destructive',
                    )}
                  />
                  <View pointerEvents="none" className="absolute left-3">
                    <Icon
                      as={Lock}
                      size={18}
                      className="text-muted-foreground"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowPassword(v => !v)}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'
                    }
                    hitSlop={8}
                    className="absolute right-3 p-1"
                  >
                    <Icon
                      as={showPassword ? EyeOff : Eye}
                      size={18}
                      className="text-muted-foreground"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <FieldError message={errors.password} />
                ) : null}
              </View>

              {formError ? (
                <View className="flex-row items-center gap-2 rounded-md bg-destructive/10 px-3 py-2.5">
                  <Icon
                    as={CircleAlert}
                    size={16}
                    className="text-destructive"
                  />
                  <Text className="flex-1 text-sm text-destructive">
                    {formError}
                  </Text>
                </View>
              ) : null}

              <Button
                size="lg"
                className="h-12 sm:h-12"
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.primaryForeground} />
                ) : null}
                <Text className="text-base font-semibold">
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Text>
              </Button>
            </CardContent>
          </Card>

          <TouchableOpacity
            onPress={fillDemoAccount}
            accessibilityRole="button"
            className="items-center gap-1 rounded-lg border border-dashed border-border px-4 py-3"
          >
            <Text className="text-sm text-muted-foreground">
              Tài khoản dùng thử (chạm để điền)
            </Text>
            <Text className="text-sm font-semibold text-primary">
              {DEMO_ACCOUNT.username} / {DEMO_ACCOUNT.password}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <Icon as={CircleAlert} size={14} className="text-destructive" />
      <Text className="text-sm text-destructive">{message}</Text>
    </View>
  );
}

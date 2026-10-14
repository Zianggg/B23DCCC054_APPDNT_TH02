/**
 * @format
 */

// Metro bật inlineRequires nên Reanimated chỉ khởi tạo khi lần đầu dùng tới (lúc mở
// AlertDialog) và animation `entering` lần đầu bị lỡ → hộp thoại vô hình. Nạp sớm ở đây.
import 'react-native-reanimated';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// NativeWind (react-native-css-interop) đăng ký style cho cả ImageBackground nên RN 0.87
// in cảnh báo deprecated dù app không dùng component này.
LogBox.ignoreLogs(['ImageBackground is deprecated']);

AppRegistry.registerComponent(appName, () => App);

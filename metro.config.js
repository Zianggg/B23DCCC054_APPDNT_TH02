const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Các gói @rn-primitives có cả bản ESM (.mjs) lẫn CJS (.js). Metro chọn bản theo kiểu
    // import/require nên một gói có thể bị nạp 2 lần — với @rn-primitives/portal thì
    // AlertDialog và <PortalHost /> dùng 2 store khác nhau và hộp thoại không bao giờ hiện.
    // Ép mọi import @rn-primitives/* về cùng một bản CJS.
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('@rn-primitives/')) {
        return context.resolveRequest(
          { ...context, isESMImport: false },
          moduleName,
          platform,
        );
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = withNativeWind(
  mergeConfig(getDefaultConfig(__dirname), config),
  { input: './global.css', inlineRem: 16 },
);

import * as React from 'react';

type Preferences = {
  /** Hiện số tin nhắn / thông báo chưa đọc trên thanh tab. */
  showBadges: boolean;
  /** Cho người khác thấy mình đang hoạt động. */
  showOnlineStatus: boolean;
};

type PreferencesContextValue = Preferences & {
  setPreference: <K extends keyof Preferences>(
    key: K,
    value: Preferences[K],
  ) => void;
};

const PreferencesContext = React.createContext<PreferencesContextValue | null>(
  null,
);

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] = React.useState<Preferences>({
    showBadges: true,
    showOnlineStatus: true,
  });

  const value = React.useMemo<PreferencesContextValue>(
    () => ({
      ...preferences,
      setPreference: (key, next) =>
        setPreferences(prev => ({ ...prev, [key]: next })),
    }),
    [preferences],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = React.useContext(PreferencesContext);
  if (!context)
    throw new Error('usePreferences phải dùng bên trong <PreferencesProvider>');
  return context;
}

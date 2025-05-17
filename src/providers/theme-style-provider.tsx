import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type ThemeStyle =
  | 'default'
  | 'claude'
  | 't3-chat'
  | 'claymorphism'
  | 'solar-dusk'
  | 'notebook'
  | 'perpetuity'
  | 'vintage-paper'
  | 'candyland'
  | 'supabase'
  | 'twitter'
  | 'vercel';

type ThemeStyleProviderProps = {
  children: ReactNode;
  defaultTheme?: ThemeStyle;
  storageKey?: string;
};

type ThemeStyleContextState = {
  themeStyle: ThemeStyle;
  setThemeStyle: (theme: ThemeStyle) => void;
};

const initialState: ThemeStyleContextState = {
  themeStyle: 'default',
  setThemeStyle: () => null,
};

const ThemeStyleContext = createContext<ThemeStyleContextState>(initialState);

export function ThemeStyleProvider({
  children,
  defaultTheme = 'default',
  storageKey = 'vite-ui-theme-style',
  ...props
}: ThemeStyleProviderProps) {
  const [themeStyle, setThemeStyle] = useState<ThemeStyle>(() => {
    return (localStorage.getItem(storageKey) as ThemeStyle) || defaultTheme;
  });

  useEffect(() => {
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
      document.head.removeChild(existingLink);
    }

    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = `/theme-styles/${themeStyle}-theme.css`;

    document.head.appendChild(link);
  }, [themeStyle]);

  const value = {
    themeStyle,
    setThemeStyle: (themeStyle: ThemeStyle) => {
      localStorage.setItem(storageKey, themeStyle);
      setThemeStyle(themeStyle);
    },
  };

  return (
    <ThemeStyleContext.Provider {...props} value={value}>
      {children}
    </ThemeStyleContext.Provider>
  );
}

export const useThemeStyle = () => {
  const context = useContext(ThemeStyleContext);

  if (context === undefined)
    throw new Error('useThemeStyle must be used within a ThemeStyleProvider');

  return context;
};

import { APP_BASE_PATH } from '@/shared/config/constants';
import {
  ThemeProviderContext,
  type BaseFont,
  type Theme,
  type ThemeColor,
  type TitleFont,
} from '@/shared/lib/theme-context';
import { useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;

  defaultThemeColor?: ThemeColor;
  storageKeyThemeColor?: string;

  defaultBaseFont?: BaseFont;
  storageKeyBaseFont?: string;

  defaultTitleFont?: TitleFont;
  storageKeyTitleFont?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',

  defaultThemeColor = 'default',
  storageKeyThemeColor = 'vite-ui-theme-color',

  defaultBaseFont = 'Noto Sans JP',
  storageKeyBaseFont = 'vite-ui-theme-base-font',

  defaultTitleFont = 'Poetsen One',
  storageKeyTitleFont = 'vite-ui-theme-title-font',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const [themeColor, setThemeColor] = useState<ThemeColor>(
    () =>
      (localStorage.getItem(storageKeyThemeColor) as ThemeColor) ||
      defaultThemeColor
  );

  const [baseFont, setBaseFont] = useState<BaseFont>(
    () =>
      (localStorage.getItem(storageKeyBaseFont) as BaseFont) || defaultBaseFont
  );

  const [titleFont, setTitleFont] = useState<TitleFont>(
    () =>
      (localStorage.getItem(storageKeyTitleFont) as TitleFont) ||
      defaultTitleFont
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
      // 設定しているCSSをすぐに削除すると、デフォルトで設定しているCSSに一瞬変わった後に
      // 新しく読み込んだCSSになるのでカクつく。そのため時間差をつくる。
      setTimeout(() => {
        document.head.removeChild(existingLink);
      }, 200);
    }

    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = `${APP_BASE_PATH}/theme-styles/${themeColor}-theme.css`;

    document.head.appendChild(link);
  }, [themeColor]);

  useEffect(() => {
    document.documentElement.style.removeProperty('--font-sans');
    document.documentElement.style.setProperty('--font-sans', baseFont);
  }, [baseFont]);

  useEffect(() => {
    document.documentElement.style.removeProperty('--font-title');
    document.documentElement.style.setProperty('--font-title', titleFont);
  }, [titleFont]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },

    themeColor,
    setThemeColor: (color: ThemeColor) => {
      localStorage.setItem(storageKeyThemeColor, color);
      setThemeColor(color);
    },

    baseFont,
    setBaseFont: (font: BaseFont) => {
      localStorage.setItem(storageKeyBaseFont, font);
      setBaseFont(font);
    },

    titleFont,
    setTitleFont: (font: TitleFont) => {
      localStorage.setItem(storageKeyTitleFont, font);
      setTitleFont(font);
    },
  };

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
}

import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ThemeColor =
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

export type BaseFont =
  | 'Noto Sans JP'
  | 'Noto Serif JP'
  | 'Kaisei Decol'
  | 'Kiwi Maru'
  | 'Yusei Magic'
  | 'DotGothic16'
  | 'Kosugi Maru';

export type TitleFont =
  | 'Poetsen One'
  | 'Noto Serif JP'
  | 'Luckiest Guy'
  | 'Lilita One'
  | 'Oxanium'
  | 'Architects Daughter'
  | 'Tiny5'
  | 'Pattaya'
  | 'Ribeye'
  | 'Outfit'
  | 'Alfa Slab One'
  | 'Inter';

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;

  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;

  baseFont: BaseFont;
  setBaseFont: (font: BaseFont) => void;

  titleFont: TitleFont;
  setTitleFont: (font: TitleFont) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,

  themeColor: 'default',
  setThemeColor: () => null,

  baseFont: 'Noto Sans JP',
  setBaseFont: () => null,

  titleFont: 'Poetsen One',
  setTitleFont: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

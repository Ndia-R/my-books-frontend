import Hero from '@/components/layout/hero';
import ThemeCard from '@/components/settings/theme-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { APP_TITLE } from '@/constants/constants';
import { ThemeStyle, useThemeStyle } from '@/providers/theme-style-provider';
import { motion } from 'motion/react';
import { useState } from 'react';

export type ThemeCardProps = {
  themeStyle: ThemeStyle;
  themeName: string;
  baseFont: string;
  titleFont: string;
  bg: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

const THEME_CARDS: ThemeCardProps[] = [
  {
    themeStyle: 'default',
    themeName: 'Default',
    baseFont: 'Noto Sans JP',
    titleFont: 'Poetsen One',
    bg: 'bg-[oklch(0.52_0.13_144.17)]/20 dark:bg-[oklch(0.75_0.17_144.65)]/20',
    border:
      'border-[oklch(0.52_0.13_144.17)] dark:border-[oklch(0.75_0.17_144.65)]',
    primary: 'bg-[oklch(0.52_0.13_144.17)] dark:bg-[oklch(0.75_0.17_144.65)]',
    secondary: 'bg-[oklch(0.96_0.02_147.64)] dark:bg-[oklch(0.4_0.07_145.17)]',
    accent: 'bg-[oklch(0.9_0.05_146.04)] dark:bg-[oklch(0.45_0.03_231.13)]',
    background: 'bg-[oklch(0.97_0.01_80.72)] dark:bg-[oklch(0.3_0.02_232.02)]',
  },
  {
    themeStyle: 'claude',
    themeName: 'Claude',
    baseFont: 'Noto Serif JP',
    titleFont: 'Noto Serif JP',
    bg: 'bg-[oklch(0.62_0.14_39.04)]/20 dark:bg-[oklch(0.67_0.13_38.76)]/20',
    border:
      'border-[oklch(0.62_0.14_39.04)] dark:border-[oklch(0.67_0.13_38.76)]',
    primary: 'bg-[oklch(0.62_0.14_39.04)] dark:bg-[oklch(0.67_0.13_38.76)]',
    secondary: 'bg-[oklch(0.92_0.01_92.99)] dark:bg-[oklch(0.98_0.01_95.1)]',
    accent: 'bg-[oklch(0.92_0.01_92.99)] dark:bg-[oklch(0.21_0.01_95.42)]',
    background: 'bg-[oklch(0.98_0.01_95.1)] dark:bg-[oklch(0.27_0_106.64)]',
  },
  {
    themeStyle: 't3-chat',
    themeName: 'T3 Chat',
    baseFont: 'Noto Sans JP',
    titleFont: 'Luckiest Guy',
    bg: 'bg-[oklch(0.53_0.14_355.2)]/20 dark:bg-[oklch(0.46_0.19_4.1)]/20',
    border:
      'border-[oklch(0.53_0.14_355.2)] dark:border-[oklch(0.46_0.19_4.1)]',
    primary: 'bg-[oklch(0.53_0.14_355.2)] dark:bg-[oklch(0.46_0.19_4.1)]',
    secondary: 'bg-[oklch(0.87_0.07_334.9)] dark:bg-[oklch(0.31_0.03_310.06)]',
    accent: 'bg-[oklch(0.87_0.07_334.9)] dark:bg-[oklch(0.36_0.05_308.49)]',
    background:
      'bg-[oklch(0.98_0.01_325.64)] dark:bg-[oklch(0.24_0.02_307.53)]',
  },
  {
    themeStyle: 'claymorphism',
    themeName: 'Claymorphism',
    baseFont: 'Kiwi Maru',
    titleFont: 'Lilita One',
    bg: 'bg-[oklch(0.59_0.2_277.12)]/20 dark:bg-[oklch(0.68_0.16_276.93)]/20',
    border:
      'border-[oklch(0.59_0.2_277.12)] dark:border-[oklch(0.68_0.16_276.93)]',
    primary: 'bg-[oklch(0.59_0.2_277.12)] dark:bg-[oklch(0.68_0.16_276.93)]',
    secondary: 'bg-[oklch(0.87_0_56.37)] dark:bg-[oklch(0.34_0.01_59.42)]',
    accent: 'bg-[oklch(0.94_0.03_321.94)] dark:bg-[oklch(0.39_0.01_59.47)]',
    background: 'bg-[oklch(0.92_0_48.72)] dark:bg-[oklch(0.22_0.01_67.44)]',
  },
  {
    themeStyle: 'solar-dusk',
    themeName: 'Solar dusk',
    baseFont: 'Kosugi Maru',
    titleFont: 'Oxanium',
    bg: 'bg-[oklch(0.56_0.15_49)]/20 dark:bg-[oklch(0.7_0.19_47.6)]/20',
    border: 'border-[oklch(0.56_0.15_49)] dark:border-[oklch(0.7_0.19_47.6)]',
    primary: 'bg-[oklch(0.56_0.15_49)] dark:bg-[oklch(0.7_0.19_47.6)]',
    secondary: 'bg-[oklch(0.83_0.08_74.44)] dark:bg-[oklch(0.44_0.01_73.64)]',
    accent: 'bg-[oklch(0.9_0.05_74.99)] dark:bg-[oklch(0.36_0.05_229.32)]',
    background: 'bg-[oklch(0.99_0.01_84.57)] dark:bg-[oklch(0.22_0.01_56.04)]',
  },
  {
    themeStyle: 'notebook',
    themeName: 'Notebook',
    baseFont: 'Yusei Magic',
    titleFont: 'Architects Daughter',
    bg: 'bg-[oklch(0.49_0_0)]/20 dark:bg-[oklch(0.76_0_0)]/20',
    border: 'border-[oklch(0.49_0_0)] dark:border-[oklch(0.76_0_0)]',
    primary: 'bg-[oklch(0.49_0_0)] dark:bg-[oklch(0.76_0_0)]',
    secondary: 'bg-[oklch(0.9_0_0)] dark:bg-[oklch(0.47_0_0)]',
    accent: 'bg-[oklch(0.94_0.05_94.85)] dark:bg-[oklch(0.91_0_0)]',
    background: 'bg-[oklch(0.98_0_0)] dark:bg-[oklch(0.29_0_0)]',
  },
  {
    themeStyle: 'perpetuity',
    themeName: 'perpetuity',
    baseFont: 'DotGothic16',
    titleFont: 'Tiny5',
    bg: 'bg-[oklch(0.56_0.09_203.28)]/20 dark:bg-[oklch(0.85_0.13_195.04)]/20',
    border:
      'border-[oklch(0.56_0.09_203.28)] dark:border-[oklch(0.85_0.13_195.04)]',
    primary: 'bg-[oklch(0.56_0.09_203.28)] dark:bg-[oklch(0.85_0.13_195.04)]',
    secondary: 'bg-[oklch(0.92_0.02_196.84)] dark:bg-[oklch(0.38_0.06_216.5)]',
    accent: 'bg-[oklch(0.9_0.03_201.89)] dark:bg-[oklch(0.38_0.06_216.5)]',
    background:
      'bg-[oklch(0.95_0.01_197.01)] dark:bg-[oklch(0.21_0.02_224.45)]',
  },
  {
    themeStyle: 'vintage-paper',
    themeName: 'Vintage Paper',
    baseFont: 'Noto Serif JP',
    titleFont: 'Pattaya',
    bg: 'bg-[oklch(0.62_0.08_65.54)]/20 dark:bg-[oklch(0.73_0.06_66.7)]/20',
    border:
      'border-[oklch(0.62_0.08_65.54)] dark:border-[oklch(0.73_0.06_66.7)]',
    primary: 'bg-[oklch(0.62_0.08_65.54)] dark:bg-[oklch(0.73_0.06_66.7)]',
    secondary: 'bg-[oklch(0.88_0.03_85.57)] dark:bg-[oklch(0.38_0.02_57.13)]',
    accent: 'bg-[oklch(0.83_0.04_88.81)] dark:bg-[oklch(0.42_0.03_56.34)]',
    background: 'bg-[oklch(0.96_0.02_90.24)] dark:bg-[oklch(0.27_0.01_57.65)]',
  },
  {
    themeStyle: 'candyland',
    themeName: 'Candyland',
    baseFont: 'Kaisei Decol',
    titleFont: 'Ribeye',
    bg: 'bg-[oklch(0.87_0.07_7.09)]/20 dark:bg-[oklch(0.8_0.14_349.23)]/20',
    border:
      'border-[oklch(0.87_0.07_7.09)] dark:border-[oklch(0.8_0.14_349.23)]',
    primary: 'bg-[oklch(0.87_0.07_7.09)] dark:bg-[oklch(0.8_0.14_349.23)]',
    secondary: 'bg-[oklch(0.81_0.08_225.75)] dark:bg-[oklch(0.74_0.23_142.85)]',
    accent: 'bg-[oklch(0.97_0.21_109.77)] dark:bg-[oklch(0.81_0.08_225.75)]',
    background: 'bg-[oklch(0.98_0_228.78)] dark:bg-[oklch(0.23_0.01_264.29)]',
  },
  {
    themeStyle: 'supabase',
    themeName: 'supabase',
    baseFont: 'Noto Sans JP',
    titleFont: 'Outfit',
    bg: 'bg-[oklch(0.83_0.13_160.91)]/20 dark:bg-[oklch(0.44_0.1_156.76)]/20',
    border:
      'border-[oklch(0.83_0.13_160.91)] dark:border-[oklch(0.44_0.1_156.76)]',
    primary: 'bg-[oklch(0.83_0.13_160.91)] dark:bg-[oklch(0.44_0.1_156.76)]',
    secondary: 'bg-[oklch(0.99_0_0)] dark:bg-[oklch(0.26_0_0)]',
    accent: 'bg-[oklch(0.95_0_0)] dark:bg-[oklch(0.31_0_0)]',
    background: 'bg-[oklch(0.99_0_0)] dark:bg-[oklch(0.18_0_0)]',
  },
  {
    themeStyle: 'twitter',
    themeName: 'Twitter',
    baseFont: 'Noto Sans JP',
    titleFont: 'Alfa Slab One',
    bg: 'bg-[oklch(0.67_0.16_245)]/20 dark:bg-[oklch(0.67_0.16_245)]/20',
    border: 'border-[oklch(0.67_0.16_245)] dark:border-[oklch(0.67_0.16_245)]',
    primary: 'bg-[oklch(0.67_0.16_245)] dark:bg-[oklch(0.67_0.16_245)]',
    secondary: 'bg-[oklch(0.19_0.01_248.51)] dark:bg-[oklch(0.96_0_219.53)]',
    accent: 'bg-[oklch(0.94_0.02_250.85)] dark:bg-[oklch(0.19_0.03_242.55)]',
    background: 'bg-[oklch(1_0_0)] dark:bg-[oklch(0_0_0)]',
  },
  {
    themeStyle: 'vercel',
    themeName: 'Vercel',
    baseFont: 'Noto Sans JP',
    titleFont: 'Inter',
    bg: 'bg-[oklch(0_0_0)]/20 dark:bg-[oklch(1_0_0)]/20',
    border: 'border-[oklch(0_0_0)] dark:border-[oklch(1_0_0)]',
    primary: 'bg-[oklch(0_0_0)] dark:bg-[oklch(1_0_0)]',
    secondary: 'bg-[oklch(0.94_0_0)] dark:bg-[oklch(0.25_0_0)]',
    accent: 'bg-[oklch(0.94_0_0)] dark:bg-[oklch(0.32_0_0)]',
    background: 'bg-[oklch(0.99_0_0)] dark:bg-[oklch(0_0_0)]',
  },
];

const FONT_TYPES = [
  { name: 'Noto Sans JP' },
  { name: 'Noto Serif JP' },
  { name: 'Kaisei Decol' },
  { name: 'Kiwi Maru' },
  { name: 'Yusei Magic' },
  { name: 'DotGothic16' },
  { name: 'Kosugi Maru' },
];

const TITLE_TYPES = [
  { name: 'Poetsen One' },
  { name: 'Noto Serif JP' },
  { name: 'Luckiest Guy' },
  { name: 'Lilita One' },
  { name: 'Oxanium' },
  { name: 'Architects Daughter' },
  { name: 'Tiny5' },
  { name: 'Pattaya' },
  { name: 'Ribeye' },
  { name: 'Outfit' },
  { name: 'Alfa Slab One' },
  { name: 'Inter' },
];

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  const { themeStyle, setThemeStyle } = useThemeStyle();

  const [baseFont, setBaseFont] = useState(
    document.documentElement.style.getPropertyValue('--font-sans')
  );
  const [titleFont, setTitleFont] = useState(
    document.documentElement.style.getPropertyValue('--font-title')
  );

  const handleClick = (property: string, fontName: string) => {
    document.documentElement.style.setProperty(property, fontName);
    setBaseFont(fontName);
  };

  const handleThemeCardClick = (card: ThemeCardProps) => {
    setThemeStyle(card.themeStyle);

    document.documentElement.style.removeProperty('--font-sans');
    document.documentElement.style.removeProperty('--font-title');
    document.documentElement.style.setProperty('--font-sans', card.baseFont);
    document.documentElement.style.setProperty('--font-title', card.titleFont);
    setBaseFont(card.baseFont);
    setTitleFont(card.titleFont);
  };

  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="my-4 flex h-10 items-center">
        <h1 className="text-lg font-bold sm:text-xl">設定</h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <div className="mb-4 flex flex-col gap-y-4">
        <section>
          <h2>テーマ</h2>

          <div className="relative my-4">
            <div className="sm:1/3 w-2/5 pr-2">
              <div className="grid grid-cols-2 content-start gap-2 md:grid-cols-3">
                {THEME_CARDS.map((card) => (
                  <motion.div
                    key={card.themeStyle}
                    initial={{ y: 0 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ThemeCard
                      card={card}
                      isActive={card.themeStyle === themeStyle}
                      onClick={() => handleThemeCardClick(card)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-foreground/10 sm:2/3 pointer-events-none absolute top-0 right-0 h-full w-3/5 rounded-xl border">
              <p className="text-muted-foreground px-4 py-2 text-right text-sm">
                プレビュー
              </p>
            </div>

            <div
              className="sm:2/3 absolute top-0 right-0 h-full w-3/5 overflow-hidden"
              style={{
                maskImage: `
              linear-gradient(to right, black 0%, black 85%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)
            `,
                WebkitMaskImage: `
              linear-gradient(to right, black 0%, black 85%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)
            `,
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            >
              <div className="origin-top scale-80 md:scale-80">
                <Hero />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>タイトルフォント</h2>

          <ul className="flex flex-wrap py-2">
            {TITLE_TYPES.map((font) => (
              <li key={font.name}>
                <Button
                  style={{ fontFamily: `${font.name}` }}
                  variant={titleFont === font.name ? 'outline' : 'ghost'}
                  onClick={() => {
                    handleClick('--font-title', font.name);
                  }}
                >
                  {font.name}
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>本文フォント</h2>

          <ul className="flex flex-wrap py-2">
            {FONT_TYPES.map((font) => (
              <li key={font.name}>
                <Button
                  style={{ fontFamily: `${font.name}` }}
                  variant={baseFont === font.name ? 'outline' : 'ghost'}
                  onClick={() => handleClick('--font-sans', font.name)}
                >
                  {font.name}
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

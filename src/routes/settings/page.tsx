import ThemeCard, { ThemeCardProps } from '@/components/settings/theme-card';
import { Separator } from '@/components/ui/separator';
import { APP_TITLE } from '@/constants/constants';

const THEME_CARDS: ThemeCardProps[] = [
  {
    themeStyle: 'default',
    title: 'Default',
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
    title: 'Claude',
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
    title: 'T3 Chat',
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
    title: 'Claymorphism',
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
    title: 'Solar dusk',
    bg: 'bg-[oklch(0.56_0.15_49)]/20 dark:bg-[oklch(0.7_0.19_47.6)]/20',
    border: 'border-[oklch(0.56_0.15_49)] dark:border-[oklch(0.7_0.19_47.6)]',
    primary: 'bg-[oklch(0.56_0.15_49)] dark:bg-[oklch(0.7_0.19_47.6)]',
    secondary: 'bg-[oklch(0.83_0.08_74.44)] dark:bg-[oklch(0.44_0.01_73.64)]',
    accent: 'bg-[oklch(0.9_0.05_74.99)] dark:bg-[oklch(0.36_0.05_229.32)]',
    background: 'bg-[oklch(0.99_0.01_84.57)] dark:bg-[oklch(0.22_0.01_56.04)]',
  },
  {
    themeStyle: 'notebook',
    title: 'Notebook',
    bg: 'bg-[oklch(0.49_0_0)]/20 dark:bg-[oklch(0.76_0_0)]/20',
    border: 'border-[oklch(0.49_0_0)] dark:border-[oklch(0.76_0_0)]',
    primary: 'bg-[oklch(0.49_0_0)] dark:bg-[oklch(0.76_0_0)]',
    secondary: 'bg-[oklch(0.9_0_0)] dark:bg-[oklch(0.47_0_0)]',
    accent: 'bg-[oklch(0.94_0.05_94.85)] dark:bg-[oklch(0.91_0_0)]',
    background: 'bg-[oklch(0.98_0_0)] dark:bg-[oklch(0.29_0_0)]',
  },
  {
    themeStyle: 'perpetuity',
    title: 'perpetuity',
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
    title: 'Vintage Paper',
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
    title: 'Candyland',
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
    title: 'supabase',
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
    title: 'Twitter',
    bg: 'bg-[oklch(0.67_0.16_245)]/20 dark:bg-[oklch(0.67_0.16_245)]/20',
    border: 'border-[oklch(0.67_0.16_245)] dark:border-[oklch(0.67_0.16_245)]',
    primary: 'bg-[oklch(0.67_0.16_245)] dark:bg-[oklch(0.67_0.16_245)]',
    secondary: 'bg-[oklch(0.19_0.01_248.51)] dark:bg-[oklch(0.96_0_219.53)]',
    accent: 'bg-[oklch(0.94_0.02_250.85)] dark:bg-[oklch(0.19_0.03_242.55)]',
    background: 'bg-[oklch(1_0_0)] dark:bg-[oklch(0_0_0)]',
  },
  {
    themeStyle: 'vercel',
    title: 'Vercel',
    bg: 'bg-[oklch(0_0_0)]/20 dark:bg-[oklch(1_0_0)]/20',
    border: 'border-[oklch(0_0_0)] dark:border-[oklch(1_0_0)]',
    primary: 'bg-[oklch(0_0_0)] dark:bg-[oklch(1_0_0)]',
    secondary: 'bg-[oklch(0.94_0_0)] dark:bg-[oklch(0.25_0_0)]',
    accent: 'bg-[oklch(0.94_0_0)] dark:bg-[oklch(0.32_0_0)]',
    background: 'bg-[oklch(0.99_0_0)] dark:bg-[oklch(0_0_0)]',
  },
];

type Props = {
  title: string;
};

export default function Page({ title }: Props) {
  return (
    <>
      <title>{`${title} - ${APP_TITLE}`}</title>

      <div className="m-4 flex h-10 items-center">
        <h1>設定</h1>
      </div>

      <Separator className="bg-foreground/10 my-4" />

      <section className="p-4">
        <h2 className="mb-4">テーマ</h2>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {THEME_CARDS.map((card) => (
            <ThemeCard card={card} key={card.themeStyle} />
          ))}
        </div>
      </section>
    </>
  );
}

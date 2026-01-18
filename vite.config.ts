import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 環境変数を読み込み
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // ベースパス設定: nginxのプロキシ設定と合わせる
    // アセット（JS/CSS/画像など）のパスが /my-books/ 配下に配置される
    // 環境変数から取得し、末尾スラッシュを追加
    base: `${env.VITE_APP_BASE_PATH || '/my-books'}/`,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // React関連ライブラリを1つのチャンクに
            'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
            // React Routerを別チャンクに
            'react-router': ['react-router'],
            // TanStack Query（データフェッチライブラリ）を別チャンクに
            'tanstack-query': [
              '@tanstack/react-query',
              '@tanstack/react-query-devtools',
            ],
            // Radix UIコンポーネントを別チャンクに
            'radix-ui': [
              '@radix-ui/react-avatar',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-label',
              '@radix-ui/react-radio-group',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-slot',
              '@radix-ui/react-tooltip',
              '@radix-ui/react-visually-hidden',
            ],
            // その他のUIライブラリ
            'ui-vendor': ['motion', 'sonner', 'next-themes', 'lucide-react'],
            // ユーティリティライブラリ
            utils: [
              'clsx',
              'tailwind-merge',
              'class-variance-authority',
              'use-debounce',
              'react-error-boundary',
              'react-intersection-observer',
            ],
          },
        },
      },
    },
  };
});

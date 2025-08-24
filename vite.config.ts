import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // エイリアス設定
  // https://zenn.dev/yuji6523/articles/react-absolute-path
  // shadcn/uiのviteの設定も参考
  // https://ui.shadcn.com/docs/installation/vite
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ビルド設定
  build: {
    // プロダクションビルドでコンソールログを除去
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 依存ライブラリごとに分割
    rollupOptions: {
      output: {
        manualChunks: {
          // React 関連まとめ
          react: ['react', 'react-dom', 'react-router'],

          // Radix UI 関連まとめ
          radix: [
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

          // UI ユーティリティ
          ui: [
            'class-variance-authority',
            'clsx',
            'lucide-react',
            'motion',
            'next-themes',
            'sonner',
            'tailwind-merge',
            'tw-animate-css',
            'use-debounce',
          ],

          // データフェッチ
          query: ['@tanstack/react-query', 'react-error-boundary'],
        },
      },
    },
  },
});

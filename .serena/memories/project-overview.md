# プロジェクト概要

**My Books** は、読書、ブックマーク、お気に入り、レビュー、ユーザー認証などの機能を備えた書籍ライブラリ管理のReactベースWebアプリケーション。

## テクノロジースタック

### フロントエンド
- **React 19** - UIライブラリ
- **TypeScript 5.7+** - 静的型付け言語
- **Vite** - モダンなビルドツール
- **React Router 7** - ファイルベースルーティング

### 状態管理・データ取得
- **TanStack Query (React Query)** - サーバー状態管理
- **React Context** - グローバル状態（Auth、User、Theme）

### UIライブラリ・スタイリング
- **shadcn/ui** - UIコンポーネントライブラリ
- **Radix UI** - アクセシブルなプリミティブコンポーネント
- **Tailwind CSS 4.0** - ユーティリティファーストCSS
- **Lucide React** - アイコンライブラリ
- **next-themes** - テーマ切り替え

### 開発ツール
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター  
- **Terser** - JavaScript圧縮
- **React SWC** - 高速コンパイル

### その他ライブラリ
- **react-error-boundary** - エラーバウンダリ
- **sonner** - トースト通知
- **use-debounce** - デバウンス処理
- **class-variance-authority** - 条件付きスタイリング

## プロジェクトの特徴

- モダンなReactアーキテクチャ
- TypeScript厳密設定
- ファイルベースルーティング
- コンポーネント分割による保守性
- テーマシステム（ダーク/ライト対応）
- 認証・セッション管理
- レスポンシブデザイン
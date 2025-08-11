# コードスタイル・命名規則

## ファイル・ディレクトリ命名

### ファイル命名
- **コンポーネントファイル**: kebab-case（例：`book-item.tsx`、`book-detail-skeleton.tsx`）
- **コンポーネント名**: PascalCase（例：`BookItem`、`BookDetailSkeleton`）
- **TypeScript型定義**: PascalCase（例：`Props`、`Book`、`User`）
- **関数・変数**: camelCase（例：`formatDateJP`、`queryClient`）
- **定数**: UPPER_SNAKE_CASE（例：`BOOK_IMAGE_BASE_URL`）

### ディレクトリ構造
- ドメイン別フォルダ分割（books、reviews、bookmarks等）
- 機能別コンポーネント分離
- shadcn/uiコンポーネントは`components/ui/`に格納

## TypeScript設定

### 型定義
- 厳密なTypeScript設定（5.7+）
- コンポーネントPropsは明確な命名の`Props`インターフェース
- パスエイリアス：`@/*`が`src/*`にマップ

### インポート規則
```typescript
// 外部ライブラリ
import { Card, CardContent } from '@/components/ui/card';
// 内部モジュール
import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { formatDateJP } from '@/lib/utils';
import { Book } from '@/types';
```

## コードフォーマット（Prettier）

### 基本設定
- **クォート**: シングルクォート統一（JSXではダブルクォート）
- **セミコロン**: 必須
- **トレーリングカンマ**: ES5範囲内
- **アロー関数引数**: 常に括弧付き
- **Tailwind CSS**: クラス名自動整列

### ESLint設定
- TypeScript推奨ルール
- React Hooksルール
- React Refreshルール
- プロダクション環境でのconsole制御

## アーキテクチャパターン

### 状態管理
- **サーバー状態**: TanStack Query
- **グローバル状態**: React Context
- **ローカル状態**: React hooks

### エラーハンドリング
- APIレイヤーでの一元化
- TanStack QueryのonErrorは`mutate()`実行時のみ使用
- UI特有の処理（toast通知等）

### ローディング状態
- スケルトンコンポーネント使用
- `Loader2Icon`には`aria-label`と`role="status"`設定
# My Books

React 19 + TypeScript + Vite で構築された日本語の書籍発見・読書プラットフォーム。

## 概要

My Booksは、書籍の閲覧、レビュー、お気に入り、しおり機能を提供する認証済みユーザー向けWebアプリケーションです。

### 主な機能

- 📚 書籍の検索・閲覧（タイトル検索、ジャンル検索）
- 📖 オンライン読書インターフェース（目次、ページ送り）
- ⭐ レビューの投稿・閲覧・管理
- ❤️ お気に入り登録
- 🔖 しおり機能
- 👤 ユーザープロフィール管理
- 🌓 ダークモード対応
- 🎨 カスタムテーマカラー

## 技術スタック

### コア

- **React 19** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速なビルドツール
- **React Router v7** - ルーティング

### 状態管理・データフェッチ

- **TanStack Query v5** - サーバー状態管理
- **Context API** - クライアント状態管理（認証、テーマ）

### UI・スタイリング

- **Tailwind CSS v4** - ユーティリティファーストCSS
- **Radix UI** - アクセシブルなヘッドレスコンポーネント
- **CVA** - バリアント管理
- **Motion** - アニメーション
- **Lucide React** - アイコン
- **next-themes** - テーマ管理

### その他

- **React Compiler** - 自動パフォーマンス最適化
- **Prettier** - コードフォーマッター（Tailwindクラス並び替え対応）

## 開発環境のセットアップ

### 必要要件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番用ビルド
npm run build

# ビルドのプレビュー
npm run preview

# コードのLint
npm run lint

# コードのフォーマット
npx prettier --write .
```

### 環境変数

プロジェクトルートに`.env`ファイルを作成し、`.env.example`を参考に以下の環境変数を設定してください。

```env
# APIサーバーのベースURL
VITE_BASE_URL=http://localhost:8080

# アプリケーションのベースパス（通常は変更不要）
VITE_APP_BASE_PATH=/my-books
```

## プロジェクト構造

このプロジェクトは、Next.js App Routerの規約にヒントを得たディレクトリ構造を採用していますが、ルーティングはVite環境で一般的な `react-router` による手動定義で行っています。

```
/src
├── app/                # ページコンポーネント（Next.js App Router風）
│   ├── layout.tsx     # ルートレイアウト
│   ├── page.tsx       # 各ページコンポーネント
│   ├── [feature]/     # 機能別ディレクトリ
│   │   └── page.tsx   # ページファイル
│   └── [param]/       # 動的ルート（例: [bookId]）
├── routes/            # ルーティング設定
│   ├── route.tsx      # React Routerのルート定義
│   └── protected-route.tsx # 認証保護
├── components/        # 機能別に整理されたReactコンポーネント
│   ├── books/        # 書籍検索、詳細、読書インターフェース
│   ├── bookmarks/    # しおり管理
│   ├── favorites/    # お気に入りUI
│   ├── reviews/      # レビュー作成・表示
│   ├── layout/       # Header, Footer, Menu
│   └── ui/           # 再利用可能なベースUIコンポーネント
├── constants/        # アプリ定数、クエリキー、ソートタイプ
├── hooks/            # カスタムフック
├── lib/
│   ├── api/         # ドメイン別APIクライアント関数
│   └── utils.ts     # ユーティリティ関数
├── providers/       # コンテキストプロバイダー（認証、テーマ）
└── types/           # アプリケーションで使用される型定義
```

**ディレクトリ・ルーティング規約**:

- `app/` - ページコンポーネントを配置します（Next.js App Router風）。
- `routes/` - `react-router` のルート定義を手動で行います。ファイルベースの自動ルーティングは行われません。

## コーディング規約

### URL構築

セキュリティとメンテナンス性のため、URL構築にはヘルパー関数を使用してください：

```typescript
// クエリ文字列の構築
const queryString = buildQueryString({ q: '本', page: 1, size: 20 });

// パスパラメータの構築
const path = buildPath('/books/:bookId/reviews', { bookId });

// 組み合わせ
const response = await fetchBooksApi<ReviewPage>(path + queryString);
```

### 変数命名

- URLパスを格納する変数は `path` を使用（`endpoint` ではない）
- クエリ文字列を格納する変数は `queryString` を使用

### データフェッチ

- サーバー状態管理には TanStack Query の `useSuspenseQuery` を使用
- ローディング/エラー状態は Suspense + Error Boundary で処理
- 無限スクロールには `useSuspenseInfiniteQuery` を使用

## ドキュメント

詳細な開発ガイドは [CLAUDE.md](./CLAUDE.md) を参照してください。以下の情報が含まれています：

- アーキテクチャ詳細
- TanStack Queryのパターン
- 認証フロー
- API統合方法
- ユーティリティ関数リファレンス
- コンポーネントパターン
- ベストプラクティス

## ライセンス

このプロジェクトはプライベートプロジェクトです。

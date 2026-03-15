# My Books

React 19 + TypeScript + Vite で構築された日本語の書籍発見・読書プラットフォームのフロントエンドです。

## 主な機能

- 書籍の検索・閲覧（タイトル検索、ジャンル検索、ランキング、特集）
- オンライン読書インターフェース（目次、ページ送り）
- レビューの投稿・閲覧・管理
- お気に入り登録
- しおり機能
- ユーザープロフィール管理
- ダークモード対応・カスタムテーマカラー

## 技術スタック

| カテゴリ         | ライブラリ                     |
| ---------------- | ------------------------------ |
| UI               | React 19, TypeScript           |
| ビルド           | Vite                           |
| ルーティング     | React Router v7                |
| サーバー状態管理 | TanStack Query v5              |
| スタイリング     | Tailwind CSS v4, Radix UI, CVA |
| アニメーション   | Motion                         |
| テーマ           | next-themes                    |
| アイコン         | Lucide React                   |
| 通知             | Sonner                         |

## セットアップ

### 必要要件

- Node.js 18 以上

### インストール

```bash
npm install
npm run dev
```

## スクリプト

```bash
npm run dev      # 開発サーバー起動
npm run build    # 型チェック + 本番ビルド
npm run preview  # ビルド結果のプレビュー
npm run lint     # ESLint
npx prettier --write .  # コードフォーマット
```

## 環境変数

`.env.example` を参照して、`.env.development` または `.env.production` を作成します。

```env
VITE_BASE_URL=http://localhost:8080
VITE_APP_BASE_PATH=/my-books
```

## ディレクトリ構成（FSD）

このプロジェクトは **Feature-Sliced Design (FSD)** に基づいて構成されています。

```
src/
  app/        # アプリの初期化・ルーティング・全体設定
  pages/      # 画面単位のコンポーネント（20画面）
  widgets/    # 画面を構成する中規模UIブロック（13種）
  features/   # ユーザーの目的に直結する機能（5種）
  entities/   # ドメインエンティティ（6種）
  shared/     # 共有UI・ユーティリティ・設定
```

### 各レイヤーの内容

**pages/** — 画面コンポーネント

| パス                               | 画面           | 認証       |
| ---------------------------------- | -------------- | ---------- |
| `/`                                | ホーム         | 不要       |
| `/search`                          | 書籍検索       | 不要       |
| `/discover`                        | ジャンル検索   | 不要       |
| `/ranking`                         | ランキング     | 不要       |
| `/special-features`                | 特集           | 不要       |
| `/books/:bookId`                   | 書籍詳細       | 不要       |
| `/books/:bookId/table-of-contents` | 目次           | 不要       |
| `/read-preview/:bookId/...`        | プレビュー閲覧 | 不要       |
| `/settings`                        | 設定           | 不要       |
| `/favorites`                       | お気に入り     | 必要       |
| `/profile`                         | プロフィール   | 必要       |
| `/bookmarks`                       | しおり         | プレミアム |
| `/my-reviews`                      | マイレビュー   | プレミアム |
| `/read-content/:bookId/...`        | 読書           | プレミアム |

**widgets/** — `book-detail`, `book-discovery`, `book-reviews`, `book-toc`, `book-reading`, `bookmarks`, `favorites`, `genres`, `my-reviews`, `settings`, `user-profile`, `layout`

**features/** — `book-search`（検索・ページネーション）, `review`（レビューCRUD）, `favorite-toggle`, `bookmark`, `profile`

**entities/** — `book`, `review`, `user`, `favorite`, `bookmark`, `genre`（各エンティティにAPI・型・UIを内包）

**shared/** — `ui/`（Button, Dialog, Card等20種以上）, `lib/`（ユーティリティ）, `hooks/`, `api/`（HTTPクライアント）, `config/`（定数・設定）

## コーディング規約

### URL構築

セキュリティとメンテナンス性のため、URL構築にはヘルパー関数を使用します。

```typescript
// クエリ文字列の構築（自動エンコード、undefined/null除外）
const queryString = buildQueryString({ q: '本', page: 1, size: 20 });

// パスパラメータの構築（自動エンコード、必須パラメータ検証）
const path = buildPath('/books/:bookId/reviews', { bookId });

// 組み合わせ
const response = await fetchBooksApi<ReviewPage>(path + queryString);
```

### データフェッチ

```typescript
// Suspenseパターン（推奨）
const { data } = useSuspenseQuery({
  queryKey: queryKeys.getBookDetail(bookId),
  queryFn: () => fetchBookDetail(bookId),
});

// ローディング/エラー状態は Suspense + Error Boundary で処理
<ErrorBoundary fallback={<ErrorElement />}>
  <Suspense fallback={<SkeletonLoader />}>
    <DataComponent />
  </Suspense>
</ErrorBoundary>
```

## 開発ガイド

- FSDのルールは `docs/fsd-guidelines.md` を参照してください。
- 詳細な開発情報（APIパターン、認証フロー、コンポーネント実装例等）は `CLAUDE.md` に記載しています。

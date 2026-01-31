# CLAUDE.md

このファイルは、このリポジトリでClaude Code (claude.ai/code) が作業する際のガイダンスを提供します。

## 重要: コミュニケーション言語

**このプロジェクトの開発者は日本人です。基本的なやり取りは日本語で行ってください。**

## 重要: コード修正の実施前の確認

**コードの修正を実施する前に、必ずユーザーに修正内容と方針を説明し、承認を得てから実装を開始してください。いきなり修正を始めることは禁止です。**

## プロジェクト概要

**My Books** - React 19 + TypeScript + Vite で構築された日本語の書籍発見・読書プラットフォーム。書籍の閲覧、レビュー、お気に入り、しおり、認証済みユーザー機能を提供。

## 開発コマンド

### コアコマンド

```bash
# 開発サーバーを起動 (Docker/ネットワークアクセス用のhostフラグ付き)
npm run dev

# 本番用ビルド (TypeScriptコンパイラ + Viteビルドを実行)
npm run build

# コードベースをLint
npm run lint

# 本番ビルドをプレビュー
npm run preview
```

### コードフォーマット

```bash
# Prettierでコードをフォーマット (Tailwindクラスの並び替え設定済み)
npx prettier --write .
```

## アーキテクチャ概要

### 技術スタック

- **フロントエンド**: React 19, TypeScript, Vite
- **ルーティング**: React Router v7 (ファイルベースルーティングパターン)
- **状態管理**:
  - サーバー状態: TanStack Query v5 (React Query)
  - クライアント状態: Context API (認証、テーマ)
  - URL状態: React Router search params
- **スタイリング**: Tailwind CSS v4, Radix UI (ヘッドレスコンポーネント), CVA (バリアント管理)
- **テーマ**: next-themes, 動的カラーテーマ, カスタムフォントシステム
- **アニメーション**: Motion (Framer Motion), カスタムリップルエフェクト
- **アイコン**: Lucide React
- **通知**: Sonner (トーストライブラリ)

### プロジェクト構造

このプロジェクトは **Next.js App Router風のディレクトリ構造** を採用しています（Vite + React Routerで実装）。

```
/src
├── app/                 # ページコンポーネント（Next.js App Router風）
│   ├── layout.tsx      # ルートレイアウト（Header, Footer含む）
│   ├── page.tsx        # トップページ (/)
│   ├── not-found.tsx   # 404ページ
│   ├── [feature]/      # 各機能のディレクトリ
│   │   └── page.tsx    # ページコンポーネント
│   └── [feature]/[id]/ # 動的ルート（[param]はパラメータ）
│       └── page.tsx
├── routes/             # ルーティング設定
│   ├── route.tsx       # React Routerのルート定義
│   └── protected-route.tsx # 認証保護HOC
├── components/         # 機能別に整理されたReactコンポーネント
│   ├── books/         # 書籍検索、詳細、読書インターフェース
│   ├── bookmarks/     # しおり管理
│   ├── favorites/     # お気に入りUI
│   ├── genres/        # ジャンル選択
│   ├── layout/        # Header, Footer, Menu
│   ├── reviews/       # レビュー作成・表示
│   ├── settings/      # ユーザー設定
│   ├── shared/        # 再利用可能なコンポーネント
│   ├── ui/            # ベースUIコンポーネント (shadcn/uiパターン)
│   └── users/         # ユーザープロフィールコンポーネント
├── constants/         # アプリ定数、クエリキー、ソートタイプ
├── hooks/             # カスタムフック (usePrefetch, useSearchFilters等)
├── lib/
│   ├── api/          # ドメイン別APIクライアント関数
│   └── utils.ts      # ユーティリティ関数
├── providers/        # コンテキストプロバイダー (認証、テーマ)
└── types/
    ├── domain/       # ビジネスロジック型 (Book, User, Review等)
    └── infrastructure/# 技術的な型 (HTTP, Pagination)
```

**ディレクトリ規約**:

- `app/` - ページコンポーネントを配置（Next.js App Router風）
  - `page.tsx` - ページコンポーネント（必須）
  - `layout.tsx` - レイアウトコンポーネント
  - `[param]/` - 動的ルートパラメータ（例: `[bookId]`）
- `routes/` - React Routerのルート定義とルーティングロジック
- `components/` - 再利用可能なUIコンポーネント

### パスエイリアス

`@/*` を使用して `/src/*` からインポート:

```typescript
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
```

## 主要なアーキテクチャパターン

### 1. TanStack Queryによるデータフェッチ

**クエリキー**: `/src/constants/query-keys.ts` で一元管理し、型安全性とキャッシュ管理を実現。

**Suspenseパターン** (推奨):

```typescript
const { data } = useSuspenseQuery({
  queryKey: queryKeys.getBookDetail(bookId),
  queryFn: () => fetchBookDetail(bookId),
});
```

**無限クエリパターン** (ページネーション用):

```typescript
const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
  queryKey: queryKeys.getBookReviewsInfinite(bookId),
  queryFn: ({ pageParam }) => fetchBookReviews(bookId, pageParam),
  initialPageParam: 1,
  getNextPageParam: (lastPage) =>
    lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
});
```

**キャッシュの無効化**:

```typescript
queryClient.invalidateQueries({
  queryKey: queryKeys.getBookReviewsInfinite(bookId),
});
```

**プリフェッチ** (`usePrefetch()` フックを使用):

```typescript
const { prefetchBookDetail } = usePrefetch();

<Link
  onMouseEnter={() => prefetchBookDetail(bookId)}
  onFocus={() => prefetchBookDetail(bookId)}
>
```

### 2. エラーハンドリングとローディング状態

**Suspense + Error Boundaryパターン**:

```typescript
<ErrorBoundary fallback={<ErrorElement />}>
  <Suspense fallback={<SkeletonLoader />}>
    <DataComponent />
  </Suspense>
</ErrorBoundary>
```

`useSuspenseQuery` を使用するコンポーネントは、ローディング/エラー状態を管理する必要がありません - バウンダリにスローします。

### 3. 認証

**認証フロー**:

- 保護されたルートは `useAuth()` 経由で `isAuthenticated` をチェック
- ログインはBFFにリダイレクト: `/bff/auth/login`
- ログアウトはセッションをクリアしてホームにリダイレクト
- ミューテーションにはCookieからのCSRFトークンを使用

**保護されたルート**:

```typescript
<ProtectedRoute>
  <UserSpecificPage />
</ProtectedRoute>
```

### 4. API統合

**カスタムHTTPクライアント** (`/src/lib/api/fetch.ts`):

- `HttpError` クラスによる統一されたエラーハンドリング
- `getCsrfToken()` によるCSRFトークン管理
- 自動コンテンツタイプ検出
- すべてのリクエストに認証情報を含む

**API組織** (`/src/lib/api/`):

- `books.ts` - 書籍検索、詳細、目次、コンテンツ、レビュー、統計
- `users.ts` - プロフィール、お気に入り、しおり、ユーザーレビュー
- `reviews.ts` - レビューの作成、更新、削除
- `favorites.ts` - お気に入りの追加/削除
- `bookmarks.ts` - しおりのCRUD
- `genres.ts` - ジャンル一覧
- `auth.ts` - ログアウト処理

**環境設定**:

```typescript
BOOKS_API_BASE_URL = `${VITE_BASE_URL}/api/my-books`;
BFF_API_BASE_URL = `${VITE_BASE_URL}/bff/auth`;
IMAGE_BASE_URL = `https://vsv-crystal.skygroup.local/assets/images`;
```

### 5. URL構築とセキュリティ

**安全なURL構築**:

```typescript
// クエリ文字列の構築（自動エンコード、undefined/null除外）
const queryString = buildQueryString({ q: '本', page: 1, size: 20 });
// => '?q=%E6%9C%AC&page=1&size=20'

// パスパラメータの構築（自動エンコード、必須パラメータ検証）
const path = buildPath('/books/:bookId/reviews', { bookId });
// => '/books/123/reviews'

// 組み合わせ
const response = await fetchBooksApi<ReviewPage>(path + queryString);
```

**CSRF保護付きミューテーション**:

```typescript
const path = buildPath('/reviews/:reviewId', { reviewId });
const options: RequestInit = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': getCsrfToken(), // CookieからのCSRFトークン
  },
  body: JSON.stringify(requestBody),
};
await fetchBooksApi(path, options);
```

### 6. ルーティングとナビゲーション

**ルート構造**:

- 公開: `/`, `/books/:bookId`, `/search`, `/discover`, `/ranking`, `/special-features`, `/settings`
- 保護: `/favorites`, `/bookmarks`, `/my-reviews`, `/profile`, `/read-content/:bookId/...`

**App Router風のディレクトリ規約**:

このプロジェクトは **Next.js App Router風のディレクトリ構造** を採用していますが、**React Routerを使用**しているため、以下の違いがあります:

**ディレクトリ構造とURLの対応**:

```
/src/app/search/page.tsx                      → /search
/src/app/books/[bookId]/page.tsx              → /books/:bookId
/src/app/read-content/[bookId]/chapter/       → /read-content/:bookId/chapter/:chapterNumber/
  [chapterNumber]/page/[pageNumber]/             page/:pageNumber
  page.tsx
```

**Next.jsとの主な違い**:

- ✅ ディレクトリ構造は同じ（`page.tsx`, `layout.tsx`, `[param]`）
- ⚠️ ルート定義は **手動** で `/src/routes/route.tsx` に記述が必要
- ⚠️ 自動ルート生成機能はなし（React Routerの制約）

**新しいページを追加する手順**:

1. `/src/app/` に対応するディレクトリを作成
2. `page.tsx` ファイルを作成
3. `/src/routes/route.tsx` にルート定義を追加（重要！）

**動的パラメータの取得**:

```typescript
import { useParams } from 'react-router';

export default function Page() {
  const params = useParams();
  const bookId = params.bookId || '';
  // ...
}
```

**検索フィルター**: URLクエリパラメータ管理には `useSearchFilters()` フックを使用

### 7. テーマ設定

**テーマシステム**:

- `next-themes` によるダーク/ライトモード
- `/theme-styles/{themeColor}-theme.css` から動的に読み込まれるカスタムカラーテーマ
- 日本語フォントシステム (Noto Sans JP, Noto Serif JP等)
- `/src/index.css` のCSS カスタムプロパティ

**使用方法**:

```typescript
const { theme, setTheme, themeColor, setThemeColor } = useTheme();
```

### 8. コンポーネントパターン

**UIコンポーネント** (`/src/components/ui/`):

- Radix UI プリミティブを使用したshadcn/uiパターンに基づく
- Tailwind CSSでスタイリング
- CVA (Class Variance Authority) でバリアント管理

**再利用可能なパターン**:

- 確認ダイアログ: グローバルイベントシステム付き `useConfirmDialog()` フック
- ウィンドウサイズトラッキング: `useWindowSize()`
- リップルエフェクト: `useRipple()`

## 重要な実装詳細

### TypeScript設定

- パスマッピング: `@/*` → `./src/*`
- Strictモード有効
- アプリとnode用の個別設定

### React Compiler

自動パフォーマンス最適化のため、Vite設定でReact Compilerが有効になっています。これは開発/ビルドパフォーマンスに影響する可能性があります。

### Prettier設定

- JS/TSはシングルクォート (JSXはダブルクォート)
- トレーリングカンマ (ES5互換)
- セミコロン有効
- `prettier-plugin-tailwindcss` による自動Tailwindクラス並び替え

### パフォーマンス最適化

- ホバー/フォーカス時のデータプリフェッチ
- Suspenseベースの遅延読み込み
- TanStack Queryによる無限スクロール
- React Compiler有効化

### ローカライゼーション

- 日本語ファーストUI (すべてのテキストは日本語)
- 日付フォーマット: `Intl.DateTimeFormat('ja-JP')`
- カスタムユーティリティ: `formatDateJP()`, `chapterNumberString()` (第X章)

## 共通ユーティリティ関数

`/src/lib/utils.ts` に配置:

### URL構築

- `buildQueryString()` - URLクエリ文字列の安全な構築 (自動エンコード、undefined/null除外)
- `buildPath()` - パスパラメータの安全な構築 (自動エンコード、必須パラメータ検証)

### フォーマット

- `cn()` - Tailwindクラスのマージ (clsx + tailwind-merge)
- `formatDateJP()` - 日本語の日付フォーマット (yyyy年M月d日)
- `formatDate()` - yyyy/MM/dd形式
- `formatTime()` - H:mm形式
- `formatPrice()` - カンマ区切りと「円」を追加
- `formatIsbn()` - ハイフン付きISBNフォーマット
- `chapterNumberString()` - 第X章形式にフォーマット

### その他

- `getCsrfToken()` - CookieからCSRFトークンを取得
- `sleep()` - Promiseベースの遅延

## データ型

### コアドメイン型

- `Book`, `BookDetails` - 書籍情報
- `BookToc`, `BookChapterPageContent` - 読書インターフェース
- `UserProfile`, `UserProfileCounts` - ユーザーデータ
- `Review`, `ReviewRequest` - レビューシステム
- `Favorite`, `Bookmark` - ユーザーコレクション
- `Genre` - 書籍カテゴリー

### インフラストラクチャ型

- `Page<T>` - メタデータ付きページネーションラッパー
- `HttpResponse<T>` - 標準APIレスポンス
- `HttpError` - ステータスコード付きカスタムエラークラス

## 重要な定数

`/src/constants/constants.ts` より:

```typescript
// ページサイズとソート順
DEFAULT_BOOKS_SIZE = 20;
DEFAULT_BOOKS_SORT = BookSortOrder.PopularityDesc;
DEFAULT_REVIEWS_SIZE = 3;
DEFAULT_REVIEWS_SORT = ReviewSortOrder.UpdatedAtDesc;
DEFAULT_MY_PAGE_SIZE = 5; // マイページ系コンテンツ（レビュー、お気に入り、ブックマーク）共通
DEFAULT_MY_PAGE_SORT = ReviewSortOrder.UpdatedAtDesc;

// その他
TOAST_ERROR_DURATION = 5000; // エラー通知の表示時間（ミリ秒）
```

## 開発ノート

### 新しいページを追加する際

このプロジェクトはNext.js App Router風の構造を採用していますが、React Routerを使用しているため手動でルート定義が必要です。

**手順**:

1. `/src/app/` にディレクトリを作成

   ```bash
   # 例: 新しい「about」ページを作成
   mkdir -p src/app/about
   ```

2. `page.tsx` を作成

   ```typescript
   // src/app/about/page.tsx
   export default function Page() {
     return <div>About Page</div>;
   }
   ```

3. `/src/routes/route.tsx` にルート定義を追加（重要！）

   ```typescript
   import AboutPage from '@/app/about/page';

   export const router = createBrowserRouter(
     createRoutesFromElements(
       <Route path="/" element={<RootLayout />}>
         {/* 既存のルート... */}
         <Route path="about" element={<AboutPage />} />
       </Route>
     )
   );
   ```

4. 動的ルートの場合は `[param]` ディレクトリを使用

   ```bash
   # 例: /product/:productId
   mkdir -p src/app/product/[productId]
   ```

   ```typescript
   // src/app/product/[productId]/page.tsx
   import { useParams } from 'react-router';

   export default function Page() {
     const params = useParams();
     const productId = params.productId || '';
     return <div>Product: {productId}</div>;
   }
   ```

### 新機能を追加する際

1. `/src/types/domain/` または `/src/types/infrastructure/` で型を定義
2. `/src/lib/api/` にAPI関数を作成
   - URLパスには `buildPath()` を使用してパラメータを安全にエンコード
   - クエリ文字列には `buildQueryString()` を使用
   - 変数名は `path` を使用（`endpoint` ではない）
3. `/src/constants/query-keys.ts` にクエリキーを追加
4. 必要に応じて `/src/hooks/` にカスタムフックを作成
5. `/src/components/` に再利用可能なUIコンポーネントを構築
6. `/src/app/` にページコンポーネントを作成
7. `/src/routes/route.tsx` にルート定義を追加
8. データフェッチにはSuspense + Error Boundaryパターンを使用

### フォームを扱う際

- Radix UIフォームコンポーネント (Label, Input, Select等) を使用
- Tailwindでスタイリング
- TanStack Queryの `useMutation` でミューテーション処理
- ミューテーション成功後に関連クエリを無効化
- Sonnerでトースト通知を表示

### ナビゲーションを扱う際

- React Routerの `Link` コンポーネントを使用
- UX向上のためホバー/フォーカス時にプリフェッチを追加
- URLサーチパラメータでフィルター/ページネーションを管理
- 検索ページには `useSearchFilters()` フックを使用

### スタイリングガイドライン

- Tailwind CSSクラスを使用
- `/src/components/ui/` の既存コンポーネントパターンに従う
- コンポーネントバリアントにはCVAを使用
- アニメーションにはmotionライブラリを使用
- テーマシステム (CSSカスタムプロパティ) を尊重

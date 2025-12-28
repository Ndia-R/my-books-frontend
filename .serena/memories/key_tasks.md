# 主要なタスク履歴

このファイルは、プロジェクトで実施された主要な変更とタスクを記録します。

## 最新の変更（2025-12-29）

### APIクライアントのリファクタリング

- **`src/lib/api/http-client.ts`** (旧 `fetch-client.ts`)
  - `customFetch` を汎用HTTPクライアント関数として再設計し、完全なURLを受け取るように変更
  - `fetchBooksApi` ラッパー関数を追加: Books API専用、自動的にBOOKS_API_BASE_URLを付与
  - `fetchBffApi` ラッパー関数を追加: BFF API専用、自動的にBFF_BASE_URLを付与
  - エラーハンドリングを改善: 型ガード `isHttpErrorResponse` を使用した安全な型チェック
  - JSDocコメントを追加してAPI仕様を明確化

### 認証機能の改善

- **`src/lib/api/auth.ts`** (新規作成)
  - `logoutUser` 関数を追加: 完全ログアウト（BFFセッション + Keycloakセッションクリア）
  - `fetchBffApi` を使用してBFF APIとの通信を実装

- **`src/routes/login/page.tsx`** (新規作成)
  - ログインページコンポーネントを実装
  - リダイレクト先URLを `location.state` から取得し、`return_to` パラメータとしてBFFログインに渡す機能
  - ログイン画面へのリダイレクト中の表示メッセージ

- **`src/providers/auth-provider.tsx`**
  - `login` 関数にリダイレクト先URL (`redirectTo`) パラメータを追加
  - `logout` 関数を新しい `logoutUser` API関数を使用するように変更
  - `getUserProfile` API関数を使用してプロフィール取得処理を簡素化
  - 初期ローディング状態を `true` に変更（認証状態の初期化中を明示）

- **`src/routes/protected-route.tsx`**
  - 未認証時のリダイレクト処理を改善: `/login` ページに遷移し、現在のパスを `redirectTo` として渡す

- **`src/routes/route.tsx`**
  - ログインルート (`/login`) を追加

- **`src/routes/auth-callback/page.tsx`**
  - 認証コールバック後のリダイレクト処理を改善

### お気に入り機能の改善

- **`src/components/books/stats/favorite-count-icon.tsx`**
  - お気に入り状態 (`isFavorite`) をTanStack Queryで管理するように変更
  - お気に入り数（`favoriteStats`）をTanStack Queryで管理するように変更
  - 楽観的更新の実装を `useOptimistic` から `useState` ベースに変更し、より明示的な状態管理を実現
  - お気に入り追加時のみアニメーションを実行するように改善（削除時はアニメーションなし）
  - `queryKeys` を使用したクエリキャッシュの無効化処理を追加

- **`src/components/favorites/favorite-item.tsx`**
  - お気に入りアイテムから削除ボタンを追加（以前は表示のみ）
  - `deleteFavoriteByBookId` を使用した削除機能を実装
  - 削除前の確認ダイアログ（`useConfirmDialog`）を追加
  - 削除成功時にトースト通知を表示
  - 削除成功時にクエリキャッシュを無効化してリストを更新

### API関数の整理とリファクタリング

- **ファイルのリネーム**
  - `src/lib/api/fetch-client.ts` → `src/lib/api/http-client.ts`
  - `src/lib/api/favorite.ts` → `src/lib/api/favorites.ts`
  - `src/lib/api/review.ts` → `src/lib/api/reviews.ts`
  - `src/lib/api/user.ts` → `src/lib/api/users.ts`

- **各APIファイルの更新**
  - `src/lib/api/books.ts`: `customFetch` → `fetchBooksApi` に変更
  - `src/lib/api/bookmarks.ts`: `customFetch` → `fetchBooksApi` に変更
  - `src/lib/api/favorites.ts`: `customFetch` → `fetchBooksApi` に変更
  - `src/lib/api/genres.ts`: `customFetch` → `fetchBooksApi` に変更
  - `src/lib/api/reviews.ts`: `customFetch` → `fetchBooksApi` に変更
  - `src/lib/api/users.ts`: `customFetch` → `fetchBooksApi` に変更

### コンポーネントの更新

- **書籍関連コンポーネント**
  - `src/components/books/detail/book-detail.tsx`: 新しいお気に入り機能に対応（propsの削除）
  - `src/components/books/detail/book-detail-skeleton.tsx`: マイナーな調整
  - `src/components/books/reading/book-read-content.tsx`: インポートパスの更新

- **しおり関連コンポーネント**
  - `src/components/bookmarks/bookmark-create-dialog.tsx`: インポートパスの更新
  - `src/components/bookmarks/bookmark-update-dialog.tsx`: インポートパスの更新
  - `src/components/bookmarks/bookmarks.tsx`: インポートパスの更新

- **お気に入り関連コンポーネント**
  - `src/components/favorites/favorites.tsx`: インポートパスの更新

- **レビュー関連コンポーネント**
  - `src/components/reviews/book-review-item.tsx`: インポートパスの更新
  - `src/components/reviews/book-reviews.tsx`: インポートパスの更新
  - `src/components/reviews/my-review-item.tsx`: インポートパスの更新
  - `src/components/reviews/my-reviews.tsx`: インポートパスの更新
  - `src/components/reviews/review-create-dialog.tsx`: インポートパスの更新
  - `src/components/reviews/review-update-dialog.tsx`: インポートパスの更新

- **その他のコンポーネント**
  - `src/components/layout/header.tsx`: インポートパスの更新
  - `src/components/users/user-profile-counts.tsx`: インポートパスの更新

### フックとユーティリティの更新

- **`src/hooks/use-prefetch.ts`**: インポートパスの更新

### ユーザープロフィール関連の更新

- **`src/routes/profile/change-user-info/page.tsx`**: インポートパスの更新

### ドキュメントの更新

- **`CLAUDE.md`**: プロジェクトガイダンスに以下を追加
  - コード修正前の確認プロセスの重要性を強調
  - APIクライアントの構造に関する説明を更新（`http-client.ts` の構成）

## 変更の影響範囲

### アーキテクチャレベルの変更

1. **APIクライアントの構造改善**: より柔軟で保守性の高いHTTPクライアント設計
2. **認証フローの強化**: リダイレクト先URLのサポートにより、より良いUXを実現
3. **お気に入り機能のデータフェッチング最適化**: TanStack Queryによる状態管理で一貫性を向上

### 開発者体験の向上

1. **型安全性の向上**: エラーハンドリングでの型ガード使用
2. **コードの可読性向上**: JSDocコメントの追加、関数の責務の明確化
3. **ファイル命名の一貫性**: 複数形の命名規則に統一（`favorites`, `reviews`, `users`）

## 今後の検討事項

- [ ] 他のAPI関連機能でも同様のパターンを適用する
- [ ] エラーハンドリングのさらなる改善（リトライロジック等）
- [ ] 認証フローのテストカバレッジを追加する

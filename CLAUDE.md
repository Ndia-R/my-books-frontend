# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

# 重要

基本的なやりとりは日本語でおこなってください。

## プロジェクト概要

**My Books** は、読書、ブックマーク、お気に入り、レビュー、ユーザー認証などの機能を備えた書籍ライブラリ管理のReactベースWebアプリケーションです。TypeScript、Viteで構築され、React Router 7、TanStack Query、shadcn/uiコンポーネントを使用したモダンなReactアーキテクチャを採用しています。

## 開発コマンド

- `npm run dev` - 開発サーバー起動（ホストバインド付き、devcontainerからアクセス可能）
- `npm run build` - TypeScriptコンパイル後、Viteプロダクションビルド
- `npm run lint` - TypeScriptルール付きESLint実行
- `npm run preview` - プロダクションビルドプレビュー（ホストバインド付き）

## コードアーキテクチャ

### アプリケーションコア構造

アプリケーションは以下の主要レイヤーを持つモダンなReactアーキテクチャに従っています：

**プロバイダー階層 (src/main.tsx:14-30)**:

```
QueryClientProvider -> AuthProvider -> UserProvider -> ThemeStyleProvider -> ThemeProvider -> RouterProvider
```

**ルーティングシステム**: `src/routes/`のファイルベースルーティング構造でReact Router 7を使用。保護されたルートは認証が必要で、`ProtectedRoute`コンポーネントでラップされています。

**状態管理**:

- サーバー状態管理にTanStack Query
- グローバル状態にReact Context（Auth、User、Theme）
- コンポーネントレベル状態にReact hooks

### 認証アーキテクチャ

**トークン管理 (src/lib/api/fetch-client.ts)**:

- インメモリアクセストークンストレージ
- リフレッシュトークン（HTTP-onlyクッキーに保存）を使用した401レスポンス時の自動トークン更新
- セッション期限切れ用カスタムイベントシステム（`AUTH_SESSION_EXPIRED_EVENT`）

**認証フロー**:

- アプリ初期読み込み時にトークンリフレッシュを試行
- ログイン/サインアップでアクセストークンを保存し認証状態を設定
- 401レスポンス時に自動リフレッシュ試行
- セッション期限切れ時にアプリ全体のログアウト用カスタムイベントを発信

### APIレイヤー

**ベースクライアント (src/lib/api/fetch-client.ts)**:

- 自動トークン処理付き一元化された`customFetch`関数
- 期限切れトークンの自動リトライロジック
- 一貫したエラーハンドリングとレスポンス解析
- 環境変数によるベースURL設定（`VITE_BASE_URL`）

**APIモジュール**: ドメインごとの個別ファイル構造（シンプルで直接的）

- `src/lib/api/auth.ts` - 認証API
- `src/lib/api/books.ts` - 書籍API
- `src/lib/api/bookmarks.ts` - ブックマークAPI
- `src/lib/api/favorite.ts` - お気に入りAPI
- `src/lib/api/genres.ts` - ジャンルAPI
- `src/lib/api/review.ts` - レビューAPI
- `src/lib/api/user.ts` - ユーザーAPI

**インポートパターン**: 各APIファイルを直接インポート

```typescript
import { getLatestBooks } from '@/lib/api/books';
import { getUserProfile } from '@/lib/api/user';
import { customFetch } from '@/lib/api/fetch-client';
```

### UIアーキテクチャ

**コンポーネント構成**:

- `src/components/ui/` - shadcn/uiベースコンポーネント
- `src/components/` - ドメイン機能別に整理された機能固有コンポーネント
  - `books/` - 書籍関連コンポーネント（discovery/、detail/、reading/、stats/を含む）
  - `reviews/` - レビュー機能
  - `bookmarks/` - ブックマーク機能
  - `favorites/` - お気に入り機能
  - `genres/` - ジャンル機能
  - `user/` - ユーザー関連機能
  - `layout/` - アプリケーションレイアウト
  - `shared/` - 横断的共通コンポーネント
- `src/routes/` - ファイルベースルーティング構造に従ったページコンポーネント

**スタイリング**:

- カスタムテーマシステム付きTailwind CSS
- `public/theme-styles/`の複数テーマスタイル
- next-themes経由のダーク/ライトモードサポート
- ThemeStyleProviderとThemeProviderによるカスタムテーマシステム

**アイコン**: Lucide Reactアイコンライブラリ

### TypeScript構造

**型定義**: `src/types/`で階層化された構造

- `src/types/domain/` - ビジネスドメイン型（book.ts、user.ts、review.tsなど）
- `src/types/infrastructure/` - インフラストラクチャ型（http.ts、auth.ts）

**HTTP型システム**:

- `HttpResponse<T>` - HTTPレスポンス型
- `HttpError` - HTTPエラークラス
- `HttpErrorResponse` - HTTPエラーレスポンス型

**パスエイリアス**: `@/*`が`src/*`にマップされ、よりクリーンなインポートが可能
**設定**: 厳密設定でTypeScript 5.7+を使用

### ビルド設定

**Vite設定**:

- 最適なバンドルサイズのための手動チャンク分割（React、Radix UI、ユーティリティ、クエリロジック）
- `@/*`インポート用パスエイリアス解決
- Tailwind CSSとReact SWCプラグイン

**コード品質**:

- TypeScript、React Hooks、React RefreshルールでのESLint
- フォーマット用Tailwind CSSプラグイン付きPrettier

## 環境設定

必要な環境変数:

- `VITE_BASE_URL` - バックエンドサービス用APIベースURL

## 主要パターンと規約

**コンポーネントProps**: 明確な命名のコンポーネントpropsにTypeScriptインターフェースを使用
**API呼び出し**: サーバー状態管理にTanStack Queryフックを使用
**エラーハンドリング**:

- APIレイヤーでの一元化エラーハンドリング
- TanStack Query useMutationのonErrorは`mutate()`実行時のみ使用（UI特有のtoast通知など）
- useMutation宣言時のonErrorは使用しない（オプティミスティックアップデートのロールバックが必要な場合を除く）
  **ローディング状態**:
- データ読み込み中のUX向上のためスケルトンコンポーネント
- Loader2Iconには`aria-label`と`role="status"`属性を設定（アクセシビリティ対応）
  **フォーム処理**: フォーム状態管理に`use-field-validation`などのカスタムフック

**ファイル命名**:

- コンポーネントファイルはkebab-case
- コンポーネント名はPascalCase
- コンポーネントの目的を示す説明的な名前（例：`book-detail-skeleton.tsx`）

**ディレクトリ構成原則**:

- **ドメイン機能別分類**: 書籍、レビュー、ブックマークなど機能領域で分割
- **コロケーション**: 関連ファイル（skeleton、テストなど）は対応するコンポーネントの近くに配置
- **適度な階層**: 過度に深い階層構造は避け、実用性を重視

## コード品質規約

### 必須事項

- プロダクションコードには`console.log`を残さない（Viteの設定により自動除去されるが、開発中も意識する）
- アクセシビリティ属性は必須
  - ローディング表示には`aria-label`と`role="status"`を設定
  - すべての画像には適切な`alt`属性を設定
  - インタラクティブ要素には`aria-label`を設定

### TypeScript規約

- strict mode設定を維持
- 型定義は`src/types/domain/`と`src/types/infrastructure/`に分離
- API型は必ずジェネリクスで型安全性を確保

### パフォーマンス最適化

- 大きなコンポーネントは必要に応じて遅延読み込みを検討
- Tailwindのクラス名が長くなる場合は、コンポーネント分割を検討

## テスト戦略

現在テストフレームワークは設定されていません。将来の実装時は以下を検討：

- **単体テスト**: Vitest + React Testing Library
- **E2Eテスト**: Playwright
- **コンポーネントテスト**: Storybook

## セキュリティガイドライン

### 認証・認可

- アクセストークンはインメモリ保存（既実装）
- リフレッシュトークンはHTTP-onlyクッキー（既実装）
- センシティブな情報はログ出力しない

### API通信

- すべてのAPI呼び出しは`customFetch`を経由
- エラーハンドリングは`HttpError`クラスを使用
- 401エラー時の自動リトライ機能を活用

## デプロイメント設定

### 環境変数

- `VITE_BASE_URL`: APIベースURL（必須）
- その他のセンシティブな設定は環境変数で管理

### ビルド最適化

- manual chunksによりバンドルサイズ最適化済み
- terserによりプロダクションビルドでコンソールログ自動除去

## 開発メモ

- DockerfileでのDevcontainer設定を使用
- 開発時にホットモジュールリプレースメント有効
- プレビューモードはプロダクション環境をミラー
- コンポーネントチャンクはライブラリタイプ別に分割（React、Radix UI、ユーティリティ、クエリ）

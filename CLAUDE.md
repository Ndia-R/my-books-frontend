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

**APIモジュール**: ドメインごとの個別ファイル（auth、books、bookmarks、favorites、reviews、users、genres）

### UIアーキテクチャ

**コンポーネント構成**:

- `src/components/ui/` - shadcn/uiベースコンポーネント
- `src/components/` - ドメイン別に整理された機能固有コンポーネント（books/、bookmarks/、reviews/など）
- `src/routes/` - ファイルベースルーティング構造に従ったページコンポーネント

**スタイリング**:

- カスタムテーマシステム付きTailwind CSS
- `public/theme-styles/`の複数テーマスタイル
- next-themes経由のダーク/ライトモードサポート
- ThemeStyleProviderとThemeProviderによるカスタムテーマシステム

**アイコン**: Lucide Reactアイコンライブラリ

### TypeScript構造

**型定義**: `src/types/`でドメイン別に整理（api.ts、book.ts、user.tsなど）
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
**エラーハンドリング**: ユーザーフレンドリーなメッセージでAPIレイヤーの一元化エラーハンドリング
**ローディング状態**: データ読み込み中のUX向上のためスケルトンコンポーネント
**フォーム処理**: フォーム状態管理に`use-field-validation`などのカスタムフック

**ファイル命名**:

- コンポーネントファイルはkebab-case
- コンポーネント名はPascalCase
- コンポーネントの目的を示す説明的な名前（例：`book-detail-skeleton.tsx`）

## 開発メモ

- DockerfileでのDevcontainer設定を使用
- 開発時にホットモジュールリプレースメント有効
- プレビューモードはプロダクション環境をミラー
- コンポーネントチャンクはライブラリタイプ別に分割（React、Radix UI、ユーティリティ、クエリ）

# コードレイアウト

このファイルは、プロジェクトの構造と主要なコンポーネントの配置を記録します。

## プロジェクト構造

```
/workspace
├── .serena/              # Serenaメモリディレクトリ
│   └── memories/         # メモリファイル
├── src/
│   ├── components/       # 機能別Reactコンポーネント
│   │   ├── bookmarks/    # しおり管理コンポーネント
│   │   ├── books/        # 書籍関連コンポーネント
│   │   │   ├── detail/   # 書籍詳細
│   │   │   ├── reading/  # 読書インターフェース
│   │   │   └── stats/    # お気に入りカウント等の統計
│   │   ├── favorites/    # お気に入りコンポーネント
│   │   ├── genres/       # ジャンル選択
│   │   ├── layout/       # Header, Footer等のレイアウト
│   │   ├── reviews/      # レビュー機能
│   │   ├── settings/     # ユーザー設定
│   │   ├── shared/       # 共有コンポーネント
│   │   ├── ui/           # ベースUIコンポーネント
│   │   └── users/        # ユーザープロフィール
│   ├── constants/        # アプリ定数、クエリキー
│   ├── hooks/            # カスタムフック
│   ├── lib/
│   │   ├── api/          # APIクライアント関数
│   │   │   ├── http-client.ts  # HTTPクライアント（汎用fetch関数）
│   │   │   ├── auth.ts         # 認証API
│   │   │   ├── books.ts        # 書籍API
│   │   │   ├── bookmarks.ts    # しおりAPI
│   │   │   ├── favorites.ts    # お気に入りAPI
│   │   │   ├── genres.ts       # ジャンルAPI
│   │   │   ├── reviews.ts      # レビューAPI
│   │   │   └── users.ts        # ユーザーAPI
│   │   └── utils.ts      # ユーティリティ関数
│   ├── providers/        # コンテキストプロバイダー
│   ├── routes/           # ページレベルコンポーネント
│   │   ├── login/        # ログインページ
│   │   └── ...
│   └── types/
│       ├── domain/       # ドメイン型
│       └── infrastructure/ # インフラストラクチャ型
├── CLAUDE.md             # Claude Code用プロジェクトガイダンス
└── .mcp.json             # MCP設定ファイル
```

## 主要なアーキテクチャパターン

### APIクライアント構造

- **`http-client.ts`**: HTTPリクエストの基盤
  - `customFetch`: 汎用HTTPクライアント関数
  - `fetchBooksApi`: Books API専用のラッパー関数
  - `fetchBffApi`: BFF API専用のラッパー関数
  - `getCsrfToken`: CSRFトークン取得関数

### データフェッチング

- **TanStack Query (React Query)** を使用したサーバー状態管理
- `useSuspenseQuery` でSuspenseパターンを実装
- `useSuspenseInfiniteQuery` で無限スクロールを実装
- クエリキーは `/src/constants/query-keys.ts` で一元管理

### 認証フロー

- **AuthProvider** でアプリ全体の認証状態を管理
- BFF（Backend For Frontend）を経由した認証
- 保護されたルートは `ProtectedRoute` コンポーネントでラップ
- ログイン時のリダイレクト先URLをサポート

### お気に入り機能

- TanStack Queryでお気に入り状態とカウントを管理
- 楽観的更新によるUI応答性の向上
- お気に入りアイコンでの追加・削除機能
- お気に入りリストでの削除機能

## 最近の構造変更

### APIファイルのリネーム

- `fetch-client.ts` → `http-client.ts`
- `favorite.ts` → `favorites.ts`
- `review.ts` → `reviews.ts`
- `user.ts` → `users.ts`

### 新規追加されたファイル

- `src/lib/api/auth.ts`: 認証関連のAPI関数
- `src/routes/login/page.tsx`: ログインページコンポーネント

# コードベース構造

## ディレクトリ構成

### ルートディレクトリ
```
/workspace/
├── src/                      # メインソースコード
├── public/                   # 静的ファイル
├── vite.config.ts           # Viteビルド設定
├── package.json             # npm依存関係
├── tsconfig.json            # TypeScript設定
├── eslint.config.js         # ESLint設定
├── .prettierrc.cjs          # Prettier設定
├── CLAUDE.md               # プロジェクト指示書
└── README.md               # プロジェクト説明
```

### src/ディレクトリ詳細

#### プロバイダー階層（src/providers/）
```
src/providers/
├── auth-provider.tsx        # 認証状態管理
├── user-provider.tsx        # ユーザー情報管理
├── theme-provider.tsx       # テーマ切り替え
└── theme-style-provider.tsx # カスタムテーマスタイル
```

#### ルーティング（src/routes/）
- ファイルベースルーティング構造
- React Router 7使用
- 保護されたルートは`ProtectedRoute`でラップ

```
src/routes/
├── page.tsx                 # ホームページ
├── layout.tsx              # 共通レイアウト
├── protected-route.tsx     # 認証保護ルート
├── login/page.tsx          # ログインページ
├── signup/page.tsx         # サインアップページ
├── book/[bookId]/page.tsx  # 書籍詳細（動的ルート）
├── bookmarks/page.tsx      # ブックマーク
├── favorites/page.tsx      # お気に入り
├── my-reviews/page.tsx     # マイレビュー
└── ...                     # その他機能ページ
```

#### コンポーネント（src/components/）
ドメイン別に整理された機能特化コンポーネント：

```
src/components/
├── ui/                     # shadcn/uiベースコンポーネント
├── layout/                 # レイアウト関連
├── books/                  # 書籍関連
├── reviews/               # レビュー関連
├── bookmarks/             # ブックマーク関連
├── favorites/             # お気に入り関連
├── book-detail/           # 書籍詳細関連
├── book-read/             # 読書関連
├── count-icon/            # アイコンカウント
├── profile/               # プロフィール関連
└── settings/              # 設定関連
```

#### APIレイヤー（src/lib/api/）
ドメインごとの個別ファイル構造：

```
src/lib/api/
├── fetch-client.ts        # 基盤HTTP クライアント
├── auth.ts               # 認証API
├── books.ts              # 書籍API
├── bookmarks.ts          # ブックマークAPI
├── favorite.ts           # お気に入りAPI
├── genres.ts             # ジャンルAPI
├── review.ts             # レビューAPI
└── user.ts               # ユーザーAPI
```

#### 型定義（src/types/）
階層化された型システム：

```
src/types/
├── domain/               # ビジネスドメイン型
│   ├── book.ts          # 書籍関連型
│   ├── user.ts          # ユーザー関連型
│   ├── review.ts        # レビュー関連型
│   └── ...
├── infrastructure/       # インフラ層型
│   ├── http.ts          # HTTP関連型
│   ├── auth.ts          # 認証関連型
│   └── pagination.ts    # ページネーション型
└── index.ts             # 型エクスポート
```

#### その他
```
src/
├── hooks/               # カスタムReactフック
├── constants/           # 定数定義
├── assets/             # 画像等静的リソース
└── lib/                # ユーティリティ関数
```

## 主要設定ファイル

### ビルド設定（vite.config.ts）
- 手動チャンク分割（React、Radix UI、ユーティリティ、クエリロジック）
- パスエイリアス解決（@/* → src/*）
- React SWCプラグイン

### TypeScript設定
- 厳密設定でTypeScript 5.7+
- プロジェクト参照（app.json、node.json）
- パスマッピング設定

### 開発環境
- Dockerfileでのdevcontainer対応
- 環境変数：`VITE_BASE_URL`（APIベースURL）
- ホットモジュールリプレースメント有効
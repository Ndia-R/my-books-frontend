# FSD ガイドライン

このドキュメントは、本リポジトリで採用する Feature-Sliced Design (FSD) のルールを定義します。日々の開発で迷わないように、依存関係を予測可能にしつつ、過度に複雑にしないことを目的とします。

## 目的

- 依存方向を一方向に保ち、理解しやすくする。
- 過度な抽象化は避け、FSDを「ガイド」として使う。
- sliceの公開方法を標準化し、リファクタを安全にする。

## レイヤーと依存方向

レイヤー順序（下位 -> 上位）:

- `shared`
- `entities`
- `features`
- `widgets`
- `pages`
- `app`

ルール:

- 下位レイヤーは上位レイヤーに依存してはいけない。
- 同一レイヤー内の参照は許可する。
- `app` は依存グラフの最上位レイヤー。

## 公開APIルール

sliceを安定させるため、原則として公開API経由でimportする。

- `entities`, `features`, `widgets`: sliceのルート（公開API）からのみimportする。
  - 例: `@/features/book-search` （`@/features/book-search/ui/...` はNG）
- `shared`: sliceではなく共通基盤として扱う。カテゴリへの直接importを許容する。
  - 例: `@/shared/ui/button`, `@/shared/lib/utils`, `@/shared/config/constants` はすべてOK
  - 理由: `shared` はビジネスロジックを持たない技術的共通層であり、内部構造を隠蔽する必要性が低いため。
- `pages`: 公開APIは不要。
  - `app/routes` から `@/pages/*/ui/page` を直接importしてよい。
  - `pages` は最上位の機能レイヤーであり、`app` からのみ参照される前提のため。

## slice構成（目安）

slice内でよく使うフォルダ:

- `ui` UIコンポーネント
- `model` 状態やドメインロジック
- `lib` ヘルパー
- `api` データアクセス

補足:

- すべてのsliceに全フォルダが必要なわけではない。
- 役割に応じた最小構成を優先する。

## importパスのルール

- slice間の参照は `@/` エイリアスを優先する。
- レイヤーやsliceをまたぐ相対パス参照は避ける。
- 深いパスの直importは原則禁止（`shared` と `pages` の例外のみ許可）。

## 例

許可:

- `app` -> `pages`（`ui/page` への直接import可）
- `pages` -> `widgets`
- `widgets` -> `features`
- `features` -> `entities`
- `entities` -> `shared`

禁止:

- `shared` -> `features`（下位 -> 上位）
- `features` -> `pages`（下位 -> 上位）
- `widgets` -> `app`（下位 -> 上位）

## 迷ったとき

依存方向が不明な場合は「下位は上位を参照しない」を基本にする。例外が必要なら、このドキュメントに追記する。

# 推奨コマンド

## 開発環境

### 基本コマンド
```bash
npm run dev        # 開発サーバー起動（ホストバインド付き）
npm run build      # プロダクションビルド（TypeScriptコンパイル後Viteビルド）
npm run preview    # プロダクションビルドプレビュー（ホストバインド付き）
npm run lint       # ESLintによるコード品質チェック
```

### システムコマンド
```bash
# 基本的なLinuxコマンド
ls                 # ファイル・ディレクトリ一覧
cd <directory>     # ディレクトリ移動
grep <pattern>     # パターン検索
find <path>        # ファイル検索
git status         # Gitステータス確認
git add <file>     # ファイルをステージング
git commit -m "<message>" # コミット
```

## 開発フロー

1. **開発開始**: `npm run dev`
2. **コード修正**: エディタで編集
3. **品質チェック**: `npm run lint`
4. **ビルド確認**: `npm run build`
5. **プレビュー**: `npm run preview`

## 注意事項

- 開発サーバーは`--host`オプション付きでdevcontainerからアクセス可能
- TypeScriptコンパイルはビルド時に実行される
- ESLintは厳密な設定（TypeScript、React Hooks、React Refresh）
- Prettierによる自動フォーマット（Tailwind CSSクラス整列含む）
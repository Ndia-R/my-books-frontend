module.exports = {
  printWidth: 90, // 折り返す行の長さ（デフォルト:80）
  tabWidth: 2, // インデントのスペースの数（デフォルト:2）
  useTabs: false, // スペースをタブに置き換える（デフォルト:false）
  semi: true, // ステートメントの最後にセミコロンを追加（デフォルト:true）
  singleQuote: true, // シングルクォートに統一（デフォルト:false）
  trailingComma: 'es5', // 複数行の場合は可能な限り末尾のカンマ（デフォルト:es5）
  bracketSpacing: true, // オブジェクトリテラルの括弧間にスペースを追加（デフォルト:true）
  bracketSameLine: false, // TMLタグの閉じカッコを同一行に含める（デフォルト:false）
  endOfLine: 'lf', // 改行コードの指定（デフォルト:lf）
  jsxSingleQuote: false, // JSXにおいてダブルクォーテーションの代わりにシングルクォーテーションを使用（デフォルト:false）

  // Prettierでimportを整理（未使用のインポートを並べ替え、結合、削除）
  // https://www.npmjs.com/package/prettier-plugin-organize-imports
  plugins: ['prettier-plugin-organize-imports'],
};

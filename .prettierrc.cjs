module.exports = {
  singleQuote: true, // シングルクォートに統一
  trailingComma: 'es5', // ES5の範囲内でトレーリングカンマをつける（オブジェクト・配列・関数引数など）
  jsxSingleQuote: false, //  JSXではダブルクォート
  semi: true, // セミコロンをつける
  arrowParens: 'always', // アロー関数の引数に()を必ずつける

  // Prettierでtailwindのクラス名の順番を自動整列
  // https://www.npmjs.com/package/prettier-plugin-tailwindcss
  plugins: ['prettier-plugin-tailwindcss'],
};

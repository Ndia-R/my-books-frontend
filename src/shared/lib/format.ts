/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns yyyy年M月d日の文字列
 */
export const formatDateJP = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns yyyy/MM/dd日の文字列
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\./g, '/'); // '.'区切りを '/' に変換
};

/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns H:mmの文字列
 */
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

/**
 * 相対時刻表示（○分前、○時間前など）に変換
 * 7日以内: 相対時刻（例: "3分前"、"2時間前"、"昨日"）
 * 7日より前: 絶対時刻（例: "2024年12月1日"）
 * @param dateString yyyy-MM-ddTHH:mm:ss形式の文字列
 * @returns 相対時刻または絶対時刻の文字列
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat('ja', { numeric: 'auto' });

  // 7日以内: 相対時刻
  if (diffSeconds < 60) return 'たった今';
  if (diffMinutes < 60) return rtf.format(-diffMinutes, 'minute');
  if (diffHours < 24) return rtf.format(-diffHours, 'hour');
  if (diffDays < 7) return rtf.format(-diffDays, 'day');

  // 7日より前: 絶対時刻
  return formatDateJP(dateString);
};

/**
 * 価格をカンマ区切り数字文字列へ変換
 * @param price 価格
 * @returns カンマ区切り数字文字列
 */
export const formatPrice = (price: number) => {
  return price === 0 ? '-' : `${Number(price).toLocaleString()}円`;
};

/**
 * ISBNの文字列をハイフンを含めたISBN文字列へ変換
 * @param isbn isbn文字列
 * @returns ハイフンを含めたISBN文字列
 */
export const formatIsbn = (isbnString: string) => {
  const country = isbnString.slice(0, 3);
  const area = isbnString.slice(3, 4);
  const publisher = isbnString.slice(4, 7);
  const book = isbnString.slice(7, 12);
  const check = isbnString.slice(12, 13);

  return country + '-' + area + '-' + publisher + '-' + book + '-' + check;
};

/**
 * 章番号文字列を返す
 * @param num 章番号
 * @returns 章番号を含めた文字列
 */
export const chapterNumberString = (num: number) => {
  return `第${num}章`;
};

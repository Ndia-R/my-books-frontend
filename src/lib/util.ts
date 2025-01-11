import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * sleep関数
 * @param msec ミリ秒
 *
 * await sleep(3000);  // ３秒待つ
 */
export const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns yyyy年M月d日の文字列
 */
export const formatDateJP = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
};

/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns yyyy/MM/dd日の文字列
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}/${month}/${day}`;
};

/**
 * yyyy-MM-ddTHH:mm:ss形式の文字列を変換
 * @param dateString
 * @returns HH:mmの文字列
 */
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

/**
 * 価格をカンマ区切り数字文字列へ変換
 * @param price 価格
 * @returns カンマ区切り数字文字列
 */
export const priceToString = (price: number) => {
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

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * yyyy-MM-dd形式の文字列をyyyy年MM月dd日へ変換
 * @param dateString yyyy-MM-dd形式の文字列
 * @returns yyyy年MM月dd日の文字列
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let formattedDate = `${year}年`;
  if (month) formattedDate += `${month}月`;
  if (day) formattedDate += `${day}日`;

  return formattedDate;
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

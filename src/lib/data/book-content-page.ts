import { fetchJsonWithAuth } from '@/lib/auth';
import { BookContentPage } from '@/types';

export const getBookContentPage = async (
  bookId: string,
  chapterNumber: number,
  pageNumber: number
) => {
  try {
    const url = `/books/${bookId}/chapters/${chapterNumber}/pages/${pageNumber}`;
    const bookContentPage = await fetchJsonWithAuth<BookContentPage>(url);
    return bookContentPage;
  } catch (err) {
    throw new Error('書籍のページ情報の読み込みが失敗しました。' + err);
  }
};

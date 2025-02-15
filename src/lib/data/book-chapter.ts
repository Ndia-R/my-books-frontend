import { fetchJson } from '@/lib/data';
import { BookTableOfContents } from '@/types';

export const getBookTableOfContents = async (bookId: string) => {
  try {
    const url = `/books/${bookId}/table-of-contents`;
    const bookTableOfContents = await fetchJson<BookTableOfContents>(url);
    return bookTableOfContents;
  } catch {
    throw new Error('書籍の目次の読み込みが失敗しました。');
  }
};

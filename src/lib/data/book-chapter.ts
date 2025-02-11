import { fetchJsonWithAuth } from '@/lib/auth';
import { BookTableOfContents } from '@/types';

export const getBookTableOfContents = async (bookId: string) => {
  try {
    const url = `/book/${bookId}/table-of-contents`;
    const bookTableOfContents = await fetchJsonWithAuth<BookTableOfContents>(url);
    return bookTableOfContents;
  } catch {
    throw new Error('目次の読み込みが失敗しました。');
  }
};

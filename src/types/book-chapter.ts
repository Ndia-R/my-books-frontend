export interface BookChapter {
  chapterNumber: number;
  chapterTitle: string;
  pageNumbers: number[];
}

export interface BookTableOfContents {
  bookId: string;
  chapters: BookChapter[];
}

// Google Books API公式ドキュメント
// https://developers.google.com/books/docs/v1/reference/volumes?hl=ja
// https://developers.google.com/books/docs/v1/reference/volumes/list?hl=ja
// https://developers.google.com/books/docs/v1/reference/volumes/get?hl=ja

export interface GoogleApiBook {
    kind: string; // 'books#volume';
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: {
        type: string;
        identifier: string;
      }[];
      pageCount: number; // integer
      dimensions: {
        height: string;
        width: string;
        thickness: string;
      };
      printType: string;
      mainCategory: string;
      categories: string[];
      averageRating: number; // double
      ratingsCount: number; // integer
      contentVersion: string;
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
        small: string;
        medium: string;
        large: string;
        extraLarge: string;
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string;
    };
    userInfo: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      review: any; // mylibrary.reviews Resource,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      readingPosition: any; // mylibrary.readingpositions Resource,
      isPurchased: boolean;
      isPreordered: boolean;
      updated: string; // datetime
    };
    saleInfo: {
      country: string;
      saleability: string;
      onSaleDate: string; // datetime
      isEbook: boolean;
      listPrice: {
        amount: number; // double
        currencyCode: string;
      };
      retailPrice: {
        amount: number; // double
        currencyCode: string;
      };
      buyLink: string;
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: {
        isAvailable: boolean;
        downloadLink: string;
        acsTokenLink: string;
      };
      pdf: {
        isAvailable: boolean;
        downloadLink: string;
        acsTokenLink: string;
      };
      webReaderLink: string;
      accessViewStatus: string;
      downloadAccess: {
        kind: string; // 'books#downloadAccessRestriction';
        volumeId: string;
        restricted: boolean;
        deviceAllowed: boolean;
        justAcquired: boolean;
        maxDownloadDevices: number; // integer
        downloadsAcquired: number; // integer
        nonce: string;
        source: string;
        reasonCode: string;
        message: string;
        signature: string;
      };
    };
    searchInfo: {
      textSnippet: string;
    };
  }

  export interface SearchResponse {
    kind: string; // "books#volumes";
    items: GoogleApiBook[];
    totalItems: number;
  }

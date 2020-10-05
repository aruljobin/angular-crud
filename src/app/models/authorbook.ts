export class AddData {
  isAuthor: boolean;
  authorData?: Author;
  bookData?: Book;
}

export class Author {
  id?: number;
  firstname: string;
  lastname: string;
  booksCount: number = 0;
}

export class Book {
  id?: number;
  authorId: number;
  bookname: string;
  bookPrice: number;
  createDate?: string;
  publishDate?: string
}


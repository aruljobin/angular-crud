export class AddData {
  isAuthor: boolean;
  authorData?: Author;
  bookData?: Book;
}

export class Author {
  id?: number;
  firstname: string;
  lastname: string;
}

export class Book {
  id?: number;
  authorId: number;
  bookname: string;
  bookPrice: number;
  createDate?: string;
  publishDate?: string
}


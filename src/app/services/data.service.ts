import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Author, Book} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:8080/author/';
  private readonly BOOK_API_URL = 'http://localhost:8080/book/';

  dataChange: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Book[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllAuthors() {
    return this.httpClient.get<Author[]>(this.API_URL+"all");
  }

  addAuthor (author: Author) {
    return this.httpClient.post<Author[]>(this.API_URL+"add", author);
  }

  updateAuthor (authorId: number, author: Author) {
    return this.httpClient.put<Author[]>(this.API_URL+authorId, author);
  }

  deleteAuthor (id: number) {
    return this.httpClient.delete<[]>(this.API_URL+id);
  }

  getAllBooks() {
    return this.httpClient.get<Author[]>(this.BOOK_API_URL+"all");
  }

  addBook(book: Book) {
    return this.httpClient.post<Author[]>(this.BOOK_API_URL+"add", book);
  }

  updateBook(bookId: number, book: Book) {
    return this.httpClient.put<Author[]>(this.BOOK_API_URL+bookId, book);
  }

  deleteBook(id: number) {
    return this.httpClient.delete<[]>(this.BOOK_API_URL+id);
  }

  getAllBooksByAuthor(authorId: number) {
    this.httpClient.get<Book[]>(this.BOOK_API_URL+authorId).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
  }
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/





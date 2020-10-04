import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
 
  public bookList = [];
  public authorList = [];
  public bookSub: Subscription;
  public authorSub: Subscription;

  constructor(public dialog: MatDialog, public dataService: DataService) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllAuthors();
  }

  ngOnDestroy(): void {
    this.bookSub.unsubscribe();
    this.authorSub.unsubscribe();
  }

  public addBook() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {isAuthor: false, authorList: this.authorList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getAllBooks();
      }
    });
  }

  startEdit(i: number, id: number, authorId: number, bookname: string, bookprice: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {isAuthor: false,id: id, authorId: authorId, bookname: bookname, bookprice: bookprice, authorList: this.authorList}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getAllBooks();
      }
    });
  }

  deleteItem(i: number, id: number, bookname: string, bookprice: string, authorname: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {isAuthor: false, id: id, bookname: bookname, bookprice: bookprice, authorname: authorname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getAllBooks();
      }
    });
  }

  public getAllBooks() {
    this.bookSub = this.dataService.getAllBooks().subscribe((res) => {
      this.bookList = res;
    });
  }

  public getAllAuthors() {
    this.authorSub = this.dataService.getAllAuthors().subscribe((res) => {
      this.authorList = res;
    });
  }
}

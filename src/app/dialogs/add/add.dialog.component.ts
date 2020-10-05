import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddData, Book} from '../../models/authorbook';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AddAuthor } from '../../store/author.actions';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {

  public addAuthorForm: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
  });

  public addBookForm: FormGroup = new FormGroup({
    authorselect: new FormControl('', Validators.required),
    bookname: new FormControl('', Validators.required),
    bookprice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddData,
              public dataService: DataService,
              private datePipe: DatePipe,
              private store: Store<AppState>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public validationError(formControlName: string, addForm: FormGroup): string {
    const errors = addForm.get(formControlName).errors;
    if (errors) {
      return "Please enter valid data";
    }
  }

  public addAuthorSubmit() {
    if (this.addAuthorForm.valid) {
      this.store.dispatch(new AddAuthor(this.addAuthorForm.value));
      // this.dataService.addAuthor(this.addAuthorForm.value).subscribe((res) => {
      //   console.log("Add Author", res);
      // });
    }
    
  }

  public addBookSubmit() {
    if (this.addBookForm.valid) {
      const date = new Date();
      const book: Book = {
        bookname: this.addBookForm.get('bookname').value,
        bookPrice: this.addBookForm.get('bookprice').value,
        authorId: this.addBookForm.get('authorselect').value['id'],
        createDate: this.datePipe.transform(date, 'yyyy-MM-dd'),
        publishDate: this.datePipe.transform(date, 'yyyy-MM-dd'),
      }
      this.dataService.addBook(book).subscribe((res) => {
        console.log("Add Book", res);
      });
    }
  }
}

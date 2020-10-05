import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Book } from '../../models/authorbook';
import { DatePipe } from '@angular/common';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { UpdateAuthor } from  '../../store/author.actions';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  public addForm: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
  });

  public addBookForm: FormGroup = new FormGroup({
    authorselect: new FormControl('', Validators.required),
    bookname: new FormControl('', Validators.required),
    bookprice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });
  
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,private datePipe: DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService,
              private store: Store<AppState>) 
              {
                if (data.isAuthor) {
                  this.addForm.patchValue(data);
                } else {
                  this.addBookForm.patchValue(data);
                }
      }


  onNoClick(): void {
    this.dialogRef.close();
  }

  UpdateFormSubmit(): void {
    this.store.dispatch(new UpdateAuthor(this.data.id,this.addForm.value));
  }

  updateBookSubmit(): void {
    const date = new Date();
    const book: Book = {
      authorId: this.addBookForm.get('authorselect').value['id'],
      bookname: this.addBookForm.get('bookname').value,
      bookPrice: this.addBookForm.get('bookprice').value,
      createDate: this.datePipe.transform(date, 'yyyy-MM-dd'),
      publishDate: this.datePipe.transform(date, 'yyyy-MM-dd'),
    }
    this.dataService.updateBook(this.data.id, book).subscribe(res => {
      console.log("Updated Book", res);
    });
  }

 public validationError(formControlName: string, addForm: FormGroup): string {
    const errors = addForm.get(formControlName).errors;
    if (errors) {
      return "Please enter valid data";
    }
  }
}

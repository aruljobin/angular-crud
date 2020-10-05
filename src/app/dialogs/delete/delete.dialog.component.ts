import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { DeleteAuthor } from '../../store/author.actions';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    if (this.data.isAuthor) {
      this.store.dispatch(new DeleteAuthor(this.data.id));
      // this.dataService.deleteAuthor(this.data.id).subscribe(res => {
      //   console.log("Deleted auther", res);
      // });
    } else {
      this.dataService.deleteBook(this.data.id).subscribe(res => {
        console.log("Deleted book", res);
      });
    }
  }
}

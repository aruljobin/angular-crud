import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetAuthor } from '../store/author.actions';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { selectAuthors } from '../store/author.selectors';
import { AppState } from '../reducers';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public authorList = [];
  public unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog, public dataService: DataService,
    public router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getAllAuthors();
    this.store.dispatch(new GetAuthor());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public addAuthor() {
    this.dialog.open(AddDialogComponent, {
      data: {isAuthor: true }
    });
  }

  startEdit(i: number, id: number, firstname: string, lastname: string) {
    this.dialog.open(EditDialogComponent, {
      data: {isAuthor: true, id: id, firstname: firstname, lastname: lastname}
    });
  }

  deleteItem(i: number, id: number, firstname: string, lastname: string) {
    this.dialog.open(DeleteDialogComponent, {
      data: {isAuthor: true, id: id, firstname: firstname, lastname: lastname}
    });
  }

  public getAllAuthors() {
    this.store.pipe(select(selectAuthors), takeUntil(this.unsubscribe$)).subscribe(authors => {
      console.log('authors', authors);
      this.authorList = authors;
    })
  }

  public clickAuthor(authorId: number) {
    this.router.navigate(['/authorbooks', authorId]);
  }

}

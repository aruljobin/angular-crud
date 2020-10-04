import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  public authorList = [];
  public subscribe: Subscription;

  constructor(public dialog: MatDialog, public dataService: DataService,
    public router: Router) { }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  public addAuthor() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {isAuthor: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getAllAuthors();
      }
    });
  }

  startEdit(i: number, id: number, firstname: string, lastname: string) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {isAuthor: true, id: id, firstname: firstname, lastname: lastname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getAllAuthors();
      }
    });
  }

  deleteItem(i: number, id: number, firstname: string, lastname: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {isAuthor: true, id: id, firstname: firstname, lastname: lastname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getAllAuthors();
      }
    });
  }

  public getAllAuthors() {
    this.subscribe = this.dataService.getAllAuthors().subscribe((res) => {
      this.authorList = res;
    });
  }

  public clickAuthor(authorId: number) {
    this.router.navigate(['/authorbooks', authorId]);
  }

}

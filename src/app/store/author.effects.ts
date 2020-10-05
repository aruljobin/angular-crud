import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AddAuthor, AddAuthorSuccess, AuthorActionTypes, DeleteAuthor, DeleteAuthorSuccess, GetAuthor, GetAuthorSuccess, UpdateAuthor, UpdateAuthorSuccess } from '../store/author.actions';
import { DataService } from '../services/data.service';
import { Author } from '../models/authorbook';



@Injectable()
export class AuthorEffects {
  
  @Effect({ dispatch: true })
  public getAuthors = this.actions$.pipe(
    ofType<GetAuthor>(
      AuthorActionTypes.GetAuthors
    ),
    switchMap(action => this.dataService.getAllAuthors()),
    map(response => {
      return new GetAuthorSuccess(response);
    })
  );

  @Effect({ dispatch: true })
  public addAuthor = this.actions$.pipe(
    ofType<AddAuthor>(
      AuthorActionTypes.AddAuthor
    ),
    switchMap(action => this.dataService.addAuthor(action.payload)),
    map(response => {
      const newAuthor: Author = {
        ...response,
        booksCount: 0
      }
      return new AddAuthorSuccess(newAuthor);
    })
  );
 
  @Effect({ dispatch: true })
  public updateAuthor = this.actions$.pipe(
    ofType<UpdateAuthor>(
      AuthorActionTypes.UpdateAuthor
    ),
    switchMap(action => this.dataService.updateAuthor(action.authorId, action.payload)),
    map(response => {
      return new UpdateAuthorSuccess(response);
    })
  );

  @Effect({ dispatch: true })
  public deleteAuthor = this.actions$.pipe(
    ofType<DeleteAuthor>(
      AuthorActionTypes.DeleteAuthor
    ),
    switchMap(action => this.dataService.deleteAuthor(action.authorId)),
    map(response => {
      return new DeleteAuthorSuccess(response);
    })
  );
  
  constructor(private actions$: Actions<Action>, private dataService: DataService) {}

}

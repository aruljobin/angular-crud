import { Action} from '@ngrx/store';
import { Author } from '../models/authorbook';

export enum AuthorActionTypes {
  GetAuthors = '[Author] Get Authors',
  GetAuthorSuccess = '[Author] Get Author Success',
  AddAuthor = '[Author] Add Author',
  AddAuthorSuccess = '[Author] Add Author Success',
  UpdateAuthor = '[Author] Update Author',
  UpdateAuthorSuccess = '[Author] Update Author Success',
  DeleteAuthor = '[Author] Delete Author',
  DeleteAuthorSuccess = '[Author] Delete Author Success',
}

export class GetAuthor implements Action {
  readonly type = AuthorActionTypes.GetAuthors;
  constructor() {}
}

export class GetAuthorSuccess implements Action {
  readonly type = AuthorActionTypes.GetAuthorSuccess;
  constructor(readonly payload: Author[]) {}
}

export class AddAuthor implements Action {
  readonly type = AuthorActionTypes.AddAuthor;
  constructor(readonly payload: Author) {}
}

export class AddAuthorSuccess implements Action {
  readonly type = AuthorActionTypes.AddAuthorSuccess;
  constructor(readonly payload: Author) {}
}

export class UpdateAuthor implements Action {
  readonly type = AuthorActionTypes.UpdateAuthor;
  constructor(readonly authorId: number, readonly payload: Author) {}
}

export class UpdateAuthorSuccess implements Action {
  readonly type = AuthorActionTypes.UpdateAuthorSuccess;
  constructor(readonly payload: Author) {}
}

export class DeleteAuthor implements Action {
  readonly type = AuthorActionTypes.DeleteAuthor;
  constructor(readonly authorId: number) {}
}

export class DeleteAuthorSuccess implements Action {
  readonly type = AuthorActionTypes.DeleteAuthorSuccess;
  constructor(readonly authorId: number) {}
}

export type AuthorActions = GetAuthor |
                             AddAuthor | 
                             GetAuthorSuccess | 
                             AddAuthorSuccess | 
                             UpdateAuthor | 
                             UpdateAuthorSuccess | 
                             DeleteAuthor | 
                             DeleteAuthorSuccess;


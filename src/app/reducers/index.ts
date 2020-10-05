import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Author, Book } from '../models/authorbook';
import { authorReducer } from '../store/author.reducer';

export interface AuthorState {
  authorData: Author[];
}

export interface BookState {
  bookData: Book | [];
}

export interface AppState {
  author: AuthorState;
  book?: BookState;
}

export const reducers: ActionReducerMap<AppState> = {
  author: authorReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

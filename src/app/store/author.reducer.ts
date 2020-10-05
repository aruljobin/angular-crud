import { Action, createReducer, on } from '@ngrx/store';
import { AuthorActions, AuthorActionTypes } from '../store/author.actions';
import { Author } from '../models/authorbook';
import { AuthorState } from '../reducers';


export const authorFeatureKey = 'author';

export const initialAuthorState: AuthorState = {
  authorData: []
}

export function authorReducer(state = initialAuthorState, action: AuthorActions): AuthorState {
  switch (action.type) {

    case AuthorActionTypes.GetAuthorSuccess:
      return {
        authorData: action.payload
      }
    case AuthorActionTypes.AddAuthorSuccess:
      const authorData = [...state.authorData];
      authorData.push(action.payload);
      return {
        ...state,
        authorData
      }
    case AuthorActionTypes.UpdateAuthorSuccess:
      return {
        ...state,
        authorData: state.authorData.map((author: Author) => {
          if (author.id === action.payload.id) {
            return action.payload;
          }
          return author;
        })
      }
    case AuthorActionTypes.DeleteAuthorSuccess:
      return {
        ...state,
        authorData: state.authorData.filter((author: Author) => {
          if (author.id !== action.authorId) {
            return author;
          }
        })
      }      
    default:
      return state;
  }
}


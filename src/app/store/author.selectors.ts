import { AppState } from '../reducers';

export const selectAuthors = (state: AppState) => state.author.authorData;
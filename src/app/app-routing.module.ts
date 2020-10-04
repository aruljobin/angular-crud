import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorbooksComponent } from './authorbooks/authorbooks.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: "authors",
    pathMatch: 'full',
  },
  {
    path: "authors",
    component: AuthorsComponent,
  },
  {
    path: "books",
    component: BooksComponent,
  },
  {
    path: "authorbooks/:id",
    component: AuthorbooksComponent,
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

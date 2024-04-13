import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';
import { MovieListComponent } from './features/movie-list/movie-list.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'movies', component: MovieListComponent },
  {
    path: 'movies/:movieId',
    component: MovieDetailsComponent,
  },
];

import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';
import { MovieListComponent } from './features/movie-list/movie-list.component';

export const routes: Routes = [
    { path: 'movies/:movieId', component: MovieDetailsComponent }
    { path: 'movies', component: MovieListComponent }
    // add default path to open the homepage --> movieListComponent
];

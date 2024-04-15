import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

/**
 * Service created to fetch the movie list and individually requested movies.
 */
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }

  private httpClient: HttpClient = inject(HttpClient);

  getMovieById(movieId: string): Observable<Movie>{
    return this.httpClient.get<Movie>(`/movies/${movieId}`);
  }

  getMovies(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`/movies`);
  }
}

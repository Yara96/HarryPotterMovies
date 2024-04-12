import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private selectedMovieSubject = new BehaviorSubject<Movie | null>(null);
  selectedMovie$ = this.selectedMovieSubject.asObservable();

  constructor() { }

  private httpClient: HttpClient = inject(HttpClient);

  getMovieById(movieId: string): Observable<Movie>{
    return this.httpClient.get<Movie>(`/movies/:${movieId}`);
  }

  getMovies(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`/movies`);
  }

  setSelectedMovie(movie: Movie): void {
    this.selectedMovieSubject.next(movie);
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesService } from '../../core/services/movies.service';
import { Movie } from '../../core/models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  protected movies: Movie[] = [];
  isList: boolean = false;

  private moviesService = inject(MoviesService);
  protected destroyRef = inject(DestroyRef);
  private changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.moviesService
      .getMovies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies: Movie[]) => {
        movies.forEach((movie: Movie) => {
          this.movies.push(movie);
        });
        this.changeDetectorRef.markForCheck();
      });
  }

  trackById(index: number, item: Movie): string {
    return item.id;
  }

  selectMovie(movie: Movie): void {
    this.moviesService.setSelectedMovie(movie);
  }
}

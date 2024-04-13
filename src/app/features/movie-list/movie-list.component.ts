import { CommonModule, CurrencyPipe } from '@angular/common';
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
import { CustomCurrencyPipe } from '../../core/pipes/custom-currency.pipe';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe, RouterOutlet],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  protected movies: Movie[] = [];
  protected releaseDateTitle: string = 'Release Date';
  protected budgetTitle: string = 'Budget';
  protected durationTitle: string = 'Duration';

  private moviesService = inject(MoviesService);
  protected destroyRef = inject(DestroyRef);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    this.getMovieList();
  }

  trackById(index: number, item: Movie): string {
    return item.id;
  }

  private getMovieList(): void {
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

  protected selectMovie(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }
}

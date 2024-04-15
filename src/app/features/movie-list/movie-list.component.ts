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
import { DurationPipe } from '../../core/pipes/duration.pipe';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, distinctUntilChanged, merge } from 'rxjs';

/**
 * Movie List component including the filters.
 */
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, DurationPipe, RouterOutlet, ReactiveFormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  titleControl = new FormControl('');
  releaseDateControl = new FormControl('');
  movieFilters: FormGroup = new FormGroup({
    title: this.titleControl,
    releaseDate: this.releaseDateControl,
  });

  protected movies: Movie[] = [];
  protected filteredMovies: Movie[] = [];
  protected releaseDateTitle: string = 'Release Date';
  protected budgetTitle: string = 'Budget';
  protected durationTitle: string = 'Duration';

  private moviesService = inject(MoviesService);
  protected destroyRef = inject(DestroyRef);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    this.getMovieList();
   
    const releaseDateChanges$: Observable<string | null> =
      this.releaseDateControl.valueChanges.pipe(distinctUntilChanged());
    const searchTermChanges$: Observable<string | null> =
      this.titleControl.valueChanges.pipe(distinctUntilChanged());

    merge(releaseDateChanges$, searchTermChanges$).subscribe(() => {
      this.filteredMovies = this.filterMovies(
        this.movieFilters.get('releaseDate')?.value,
        this.movieFilters.get('title')?.value
      );

      this.changeDetectorRef.markForCheck();
    });
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

        this.filteredMovies = this.movies;
        this.changeDetectorRef.markForCheck();
      });
  }

  private filterMovies(releaseDate: string, title: string): Movie[] {
    let filteredList = this.movies;
    let releaseDateFilterValue = releaseDate.trim();
    let titleFilterValue = title.trim().toLowerCase();

    if (releaseDateFilterValue) {
      filteredList = filteredList.filter((movie) =>
        movie.release_date.includes(releaseDate)
      );
    }

    if (titleFilterValue) {
      filteredList = filteredList.filter((movie) =>
        movie.title.toLowerCase().includes(titleFilterValue)
      );
    }

    return filteredList;
  }

  protected selectMovie(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }
}

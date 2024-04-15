import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../core/services/movies.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Movie } from '../../core/models/movie.model';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../core/pipes/duration.pipe';
import { BoxOfficePipe } from '../../core/pipes/box-office.pipe';

/**
 * Movie Details component displaying the selected movie details.
 */
@Component({
  selector: 'app-movie-details-component',
  standalone: true,
  imports: [CommonModule, DurationPipe, BoxOfficePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})

export class MovieDetailsComponent {
  movieId: string = '';
  movie: Movie = {} as Movie;

  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);
  protected destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getMovieDetails();
  }

  private getMovieDetails(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['movieId'];
      this.moviesService
        .getMovieById(this.movieId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((movie) => {
          this.movie = movie;
          this.changeDetectorRef.markForCheck();
        });
    });
  }

  protected backToHomepage(): void{
    this.router.navigate(['/movies']);
  }
}

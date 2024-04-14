import { TestBed, ComponentFixture} from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MoviesService } from '../../core/services/movies.service';
import { ChangeDetectorRef } from '@angular/core';
import { Movie } from '../../core/models/movie.model';
import { By } from '@angular/platform-browser';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const movie: Movie = {
    "id": "1",
    "title": "Harry Potter and the Chamber of Secrets",
    "duration": "161",
    "budget": "125",
    "release_date": "2002-11-15",
    "box_office": "879.6",
    "cinematographers": [ "Roger Pratt" ],
    "poster": "https://www.wizardingworld.com/images/products/films/rectangle-2.png",
    "producers": [ "Chris Columbus", "David Heyman", "Mark Radcliffe" ],
    "summary": "Harry's second year at Hogwarts begins with a series of mishaps when he and Ron miss the train to Hogwarts. Furthermore, a mysterious Chamber of Secrets has been opened inside Hogwarts and students are getting petrified one after the another. Harry, Ron and Hermione start to uncover the dark tale behind the chamber using a diary Harry found, which leads them into the lair of an Acromantula. Ginny gets kidnapped and it is up to Harry to save her and the school from the monster of the Chamber of Secrets."
  };

  beforeEach (async () => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovieById']);
    moviesServiceSpy.getMovieById.and.returnValue(of(movie));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ movieId: '1' }) } },
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ChangeDetectorRef, useValue: { markForCheck: jasmine.createSpy() } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on initialization', () => {
    expect(moviesServiceSpy.getMovieById).toHaveBeenCalledWith('1');
    expect(component.movie).toEqual(movie);
  });

  it('should render movie details in template', () => {
    expect(fixture.debugElement.queryAll(By.css('[data-qa="movie-title"]'))).toBeDefined();
  });

  it('should navigate back to homepage with movieId when button clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movies']);
  });
});

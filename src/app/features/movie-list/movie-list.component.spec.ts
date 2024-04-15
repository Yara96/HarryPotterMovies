import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MoviesService } from '../../core/services/movies.service';
import { ChangeDetectorRef, DebugElement, ElementRef} from '@angular/core';
import { of } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Movie } from '../../core/models/movie.model';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const movies: Movie[] = [
    {
      id: "1",
      title: "Harry Potter and the Chamber of Secrets",
      duration: "161",
      budget: "125",
      release_date: "2002-11-15",
      box_office: "879.6",
      cinematographers: [ "Roger Pratt" ],
      poster: "https://www.wizardingworld.com/images/products/films/rectangle-2.png",
      producers: [ "Chris Columbus", "David Heyman", "Mark Radcliffe" ],
      summary: "Harry's second year at Hogwarts begins with a series of mishaps when he and Ron miss the train to Hogwarts. Furthermore, a mysterious Chamber of Secrets has been opened inside Hogwarts and students are getting petrified one after the another. Harry, Ron and Hermione start to uncover the dark tale behind the chamber using a diary Harry found, which leads them into the lair of an Acromantula. Ginny gets kidnapped and it is up to Harry to save her and the school from the monster of the Chamber of Secrets."
    },
    {
      id: "2",
      title: "Harry Potter and the Prisoner of Azkaban",
      duration: "142",
      budget: "130",
      release_date: "2002-11-15",
      box_office: "797.4",
      cinematographers: [ "Michael Seresin" ],
      poster: "https://www.wizardingworld.com/images/products/films/rectangle-3.png",
      producers: [ "Chris Columbus", "David Heyman", "Mark Radcliffe" ],
      summary: " After unintentionally using magic against Aunt Marge, Harry arrives at the Leaky Cauldron and learns that a killer named Sirius Black is after him. Hogwarts is under a dark and grim spell with Dementors, the ghostly guardians of Azkaban, looking for Black. Harry and his friends spend their third year learning how to handle a half-horse half-eagle Hippogriff, repel shape-shifting Boggarts and master the art of Divination. Harry also inherits a strange map and finds out the truth about Sirius Black being his godfather. Battling against dementors and werewolves, an incredible story unfolds as Harry masters advanced magic, crosses the barriers of time and changes the course of more than one life."
    },
  ];

  beforeEach(async () => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovies']);
    moviesServiceSpy.getMovies.and.returnValue(of(movies));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MovieListComponent],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: ChangeDetectorRef, useValue: { markForCheck: jasmine.createSpy() } },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie list on initialization', () => {
    expect(moviesServiceSpy.getMovies).toHaveBeenCalled();
    expect(fixture.debugElement.queryAll(By.css('[data-qa="movie-info"]'))).toBeDefined();
  });

  it('should filter movies by release year and title', () => {
    component.movieFilters.setValue({ releaseYear: 2002, title: 'Harry Potter and the Chamber of Secrets' });
    fixture.detectChanges();

    const movieDetailElements: DebugElement[] = fixture.debugElement.queryAll(By.css('[data-qa="movie-info"]'));

    expect(movieDetailElements.length).toBe(1);
  });

  it('should navigate to movie details page when a movie is selected', () => {
    const movieId: string = '1';
    const button: DebugElement = fixture.debugElement.query(By.css(`[id="${movieId}"]`));
    button?.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movies', movieId]);
  });
});

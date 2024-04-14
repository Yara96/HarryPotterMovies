import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { of } from 'rxjs';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });

    service = TestBed.inject(MoviesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('MoviesService', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('getMovieById', () => {
      it('should return a single movie by ID', () => {
        const movieId = 'e80d5a37-620e-4be2-92b9-fb1f5262494f';
        const expectedMovie: Movie = {
          id: 'e80d5a37-620e-4be2-92b9-fb1f5262494f',
          title: "Harry Potter and the Philosopher's Stone",
          duration: '152',
          budget: '125',
          release_date: '2001-11-04',
          box_office: '1.018',
          cinematographers: ['John Seale'],
          poster:
            'https://www.wizardingworld.com/images/products/films/rectangle-1.png',
          producers: ['Chris Columbus', 'David Heyman', 'Mark Radcliffe'],
          summary:
            'Harry Potter’s dull life is completely changed on his eleventh birthday when a mysterious letter addressed to him arrives in the mail. After finding out about his real parents and a whole hidden wizarding world, he goes on to Hogwarts, his new magical school. From battling a troll to flying on broomsticks to catch golden snitches, Harry’s new life promises to be full of joy and adventure, until he finds out about a certain Dark Lord who murdered his parents is trying to regain power. With his friends Hermione and Ron, Harry sets out to find the philosopher’s stone before Voldemort to prevent his return. After advancing through a particularly difficult set of traps designed by the school, Harry faces the Dark Lord and manages to keep the Philosopher’s Stone safe.',
        };

        service.getMovieById(movieId).subscribe((movie) => {
          expect(movie).toEqual(expectedMovie);
        });

        const req = httpTestingController.expectOne(`/movies/${movieId}`);
        expect(req.request.method).toEqual('GET');
        req.flush(expectedMovie);
      });
    });

    describe('getMovies', () => {
      it('should return a list of movies', () => {
        const expectedMovies: Movie[] = [
          {
            id: 'e80d5a37-620e-4be2-92b9-fb1f5262494f',
            title: "Harry Potter and the Philosopher's Stone",
            duration: '152',
            budget: '125',
            release_date: '2001-11-04',
            box_office: '1.018',
            cinematographers: ['John Seale'],
            poster:
              'https://www.wizardingworld.com/images/products/films/rectangle-1.png',
            producers: ['Chris Columbus', 'David Heyman', 'Mark Radcliffe'],
            summary:
              'Harry Potter’s dull life is completely changed on his eleventh birthday when a mysterious letter addressed to him arrives in the mail. After finding out about his real parents and a whole hidden wizarding world, he goes on to Hogwarts, his new magical school. From battling a troll to flying on broomsticks to catch golden snitches, Harry’s new life promises to be full of joy and adventure, until he finds out about a certain Dark Lord who murdered his parents is trying to regain power. With his friends Hermione and Ron, Harry sets out to find the philosopher’s stone before Voldemort to prevent his return. After advancing through a particularly difficult set of traps designed by the school, Harry faces the Dark Lord and manages to keep the Philosopher’s Stone safe.',
          },
          {
            id: '1e04ad42-c21f-40d3-9a7e-0a521980c192',
            title: 'Harry Potter and the Chamber of Secrets',
            duration: '161',
            budget: '125',
            release_date: '2002-11-15',
            box_office: '879.6',
            cinematographers: ['Roger Pratt'],
            poster:
              'https://www.wizardingworld.com/images/products/films/rectangle-2.png',
            producers: ['Chris Columbus', 'David Heyman', 'Mark Radcliffe'],
            summary:
              "Harry's second year at Hogwarts begins with a series of mishaps when he and Ron miss the train to Hogwarts. Furthermore, a mysterious Chamber of Secrets has been opened inside Hogwarts and students are getting petrified one after the another. Harry, Ron and Hermione start to uncover the dark tale behind the chamber using a diary Harry found, which leads them into the lair of an Acromantula. Ginny gets kidnapped and it is up to Harry to save her and the school from the monster of the Chamber of Secrets.",
          },
        ];

        service.getMovies().subscribe((movies) => {
          expect(movies).toEqual(expectedMovies);
        });

        const req = httpTestingController.expectOne(`/movies`);
        expect(req.request.method).toEqual('GET');
        req.flush(expectedMovies);
      });
    });
  });
});

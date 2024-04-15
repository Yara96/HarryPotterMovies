import { TestBed } from '@angular/core/testing';
import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DurationPipe]
    });
    pipe = TestBed.inject(DurationPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return empty string if duration is falsy', () => {
      expect(pipe.transform('')).toEqual('');
    });

    it('should return empty string if duration is not a valid number', () => {
      expect(pipe.transform('invalid')).toEqual('');
    });

    it('should transform duration string to hours and minutes format', () => {
      expect(pipe.transform('120')).toEqual('2h 0min');
    });

    it('should handle decimal values correctly', () => {
      expect(pipe.transform('150.5')).toEqual('2h 30min');
    });
  });
});


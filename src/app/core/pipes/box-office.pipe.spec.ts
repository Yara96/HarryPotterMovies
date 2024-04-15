import { TestBed } from '@angular/core/testing';
import { BoxOfficePipe } from './box-office.pipe';

describe('BoxOfficePipe', () => {
  let pipe: BoxOfficePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoxOfficePipe]
    });
    pipe = TestBed.inject(BoxOfficePipe);
  });

  it('should create an instance', () => {
    const pipe = new BoxOfficePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform box office value to formatted string', () => {
    const input = '1000';
    const expectedOutput = '$1,000 million';
    expect(pipe.transform(input)).toBe(expectedOutput);
  });

  it('should return the input value if it cannot be parsed', () => {
    const input = 'invalid';
    expect(pipe.transform(input)).toBe('');
  });

  it('should handle commas in input value', () => {
    const input = '1,500';
    const expectedOutput = '$1,500 million';
    expect(pipe.transform(input)).toBe(expectedOutput);
  });

  it('should handle decimals in input value', () => {
    const input = '1500.5';
    const expectedOutput = '$1,500.5 million';
    expect(pipe.transform(input)).toBe(expectedOutput);
  });

  it('should return empty string if input is empty', () => {
    const input = '';
    expect(pipe.transform(input)).toBe('');
  });
});

import { TestBed } from '@angular/core/testing';
import { BoxOfficePipe } from './box-office.pipe';

describe('BoxOfficePipe', () => {
  let pipe: BoxOfficePipe;
  let inputBoxOffice: string = '';
  let expectedBoxOffice: string = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoxOfficePipe]
    });
    pipe = TestBed.inject(BoxOfficePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform box office value to formatted string', () => {
    inputBoxOffice = '1000';
    expectedBoxOffice = '$1,000 million';
    expect(pipe.transform(inputBoxOffice)).toBe(expectedBoxOffice);
  });

  it('should return the input value if it cannot be parsed', () => {
    inputBoxOffice = 'invalid';
    expect(pipe.transform(inputBoxOffice)).toBe('');
  });

  it('should handle commas in input value', () => {
    inputBoxOffice = '1,500';
    expectedBoxOffice = '$1,500 million';
    expect(pipe.transform(inputBoxOffice)).toBe(expectedBoxOffice);
  });

  it('should handle decimals in input value', () => {
    inputBoxOffice = '1500.5';
    expectedBoxOffice = '$1,500.5 million';
    expect(pipe.transform(inputBoxOffice)).toBe(expectedBoxOffice);
  });

  it('should return empty string if input is empty', () => {
    inputBoxOffice = '';
    expect(pipe.transform(inputBoxOffice)).toBe('');
  });
});

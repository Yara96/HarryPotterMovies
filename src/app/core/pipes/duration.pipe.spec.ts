import { DurationPipe } from './duration.pipe';

describe('CustomCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });
});

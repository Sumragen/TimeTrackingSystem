import { SecondsToClockFormatPipe } from './seconds-to-clock-format.pipe';

describe('SecondsToClockFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsToClockFormatPipe();
    expect(pipe).toBeTruthy();
  });
});

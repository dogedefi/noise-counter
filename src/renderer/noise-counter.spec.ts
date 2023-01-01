import noiseCounter, { logger } from './noise-counter';

const sinon = require('sinon');

describe('noise-counter', () => {
  beforeAll(() => {
    jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(async () => {});
    jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(async () => {});
    jest
      .spyOn(window, 'location', 'get')
      .mockReturnValue({ reload: jest.fn() } as unknown as Location);
  });

  test('should the plan can be carried out normally', () => {
    const spyLogger = jest.spyOn(logger, 'info');

    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const clock = sinon.useFakeTimers({ now: date });

    noiseCounter();

    clock.tick(1000 * 60 * (60 * 2 - 3));
    expect(spyLogger).toHaveBeenCalled();
    expect(spyLogger).toHaveBeenCalledTimes(1);
    expect(spyLogger).toHaveBeenCalledWith('reload at AM 00:00:00');
    expect(spyLogger.mock.calls[0][0]).toBe('reload at AM 00:00:00');

    clock.tick(1000 * 60 * 5);
    expect(spyLogger.mock.calls[1][0]).toBe('start at AM 02:00:00');

    clock.tick(1000 * 60 * 56);
    expect(spyLogger.mock.calls[2][0]).toBe('pause at AM 02:55:00');

    clock.tick(1000 * 60 * 72);
    expect(spyLogger.mock.calls[3][0]).toBe(
      'play at AM 03:10:00, take a 15-minutes break'
    );

    clock.tick(1000 * 60 * 123);
    expect(spyLogger.mock.calls[4][0]).toBe('stop at AM 04:00:00');
  });
});

import { resultify } from './resultify';

describe('resultify', () => {
  it('should be defined', () => {
    expect(resultify).toBeDefined();
  });
  
  it('should return a function wrapped', () => {
    const fn = jest.fn();
    const resultified = resultify(fn);

    expect(typeof resultified).toBe('function');
  });

  it('should return a function that resolves to a success result', async () => {
    const fn = jest.fn().mockResolvedValue('foo');
    const resultified = resultify(fn);

    const [result, error] = await resultified();

    expect(result).toBe('foo');
    expect(error).toBeUndefined();
  });
  
  it('should return a function that resolves to a error result', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('async error'));
    const resultified = resultify(fn);

    const [result, error] = await resultified();

    expect(result).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('async error');
  });
});

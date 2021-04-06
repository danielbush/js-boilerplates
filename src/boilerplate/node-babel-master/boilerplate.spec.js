// Importing this so we see coverage stats from nyc:
import './boilerplate';

describe('boilerplate', () => {
  it('should run async (may require babel-polyfill for regenerator-runtime)', async () => {
    const result = await Promise.resolve(123);
    expect(result).toBe(123);
  });
});

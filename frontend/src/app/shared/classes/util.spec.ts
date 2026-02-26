import { Util } from './util';

describe('Util', () => {

  describe('generateRandomStringId', () => {

    it('should return a string', () => {
      expect(typeof Util.generateRandomStringId()).toBe('string');
    });

    it('should return a non-empty string', () => {
      expect(Util.generateRandomStringId().length).toBeGreaterThan(0);
    });

    it('should return different values on successive calls', () => {
      const results = new Set(Array.from({ length: 10 }, () => Util.generateRandomStringId()));
      expect(results.size).toBeGreaterThan(1);
    });

  });

});

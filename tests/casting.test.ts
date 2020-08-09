import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import fn from '../source';

describe('Advanced | casting', () => {
  let numberMap = {};

  beforeEach(() => {
    numberMap = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6
    };
  });

  describe('filter, map, reduce', () => {
    it('should return a correct sum (testing values)', () => {
      let res = fn(numberMap)
        .filter((v: number) => v % 2 == 0)
        .map((v: number) => v * 2)
        .reduce((sum: number, v: number) => sum + v, 1)
      ;

      // sum + 1 to test the initial
      expect(res).to.deep.equal(25);
    });

    it('should return a strange string (testing keys)', () => {
      let allowedKeys = ['a', 'c', 'e'];
      let res = fn(numberMap)
        .filter((v: number, k: string) => allowedKeys.indexOf(k) > -1)
        .map((v: number, k: string) => `${k}${v}`)
        .reduce((str: string, v: number, k: string) => `${str}|${k}:${v}`, '_')
      ;

      expect(res).to.deep.equal('_|a:a1|c:c3|e:e5');
    });
  });
});
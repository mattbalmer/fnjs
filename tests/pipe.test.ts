import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import fn from '../source';
import { StringRecord } from '@source/types';

describe('Advanced | piping', () => {
  let numberMap: StringRecord<number>;

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
      const result = fn
        .open(numberMap)
        .pipe(fn.filter, (v: number) => v % 2 == 0)
        .pipe(fn.map, (v: number) => v * 2)
        .pipe(fn.reduce, (sum: number, v: number) => sum + v, 1)
        .close()
      ;

      // sum + 1 to test the initial
      expect(result).to.equal(25);
    });

    it('should return a strange string (testing keys)', () => {
      const allowedKeys = ['a', 'c', 'e'];
      const result = fn
        .open(numberMap)
        .pipe(fn.filter, (v: number, k: string) => allowedKeys.indexOf(k) > -1)
        .pipe(fn.map, (v: number, k: string) => `${k}${v}`)
        .pipe(fn.reduce, (str: string, v: number, k: string) => `${str}|${k}:${v}`, '_')
        .close()
      ;

      expect(result).to.equal('_|a:a1|c:c3|e:e5');
    });
  });
});
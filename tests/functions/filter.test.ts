import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { filter } from '@source/functions';

describe('Functions | filter', () => {
  describe('object', () => {
    let numberMap: StringRecord<number>;

    before(() => {
      numberMap = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6
      };
    });

    it('should return even numbers (testing values)', () => {
      const res = filter(numberMap, v => v % 2 == 0);

      expect(res).to.deep.equal({
        b: 2,
        d: 4,
        f: 6
      });
    });

    it('should return odd numbers (testing keys)', () => {
      const allowedKeys = ['a', 'c', 'e'];
      const res = filter(numberMap, (v, k) => allowedKeys.indexOf(k) > -1);

      expect(res).to.deep.equal({
        a: 1,
        c: 3,
        e: 5
      });
    });

    describe('[performance]', () => {
      let numberMap: StringRecord<number>;

      before(() => {
        numberMap = {};
        for(let i = 0; i <= 10000; i++) {
          numberMap[`${i}`] = i + 1;
        }
      });

      it('10000x10000', async (done) => {
        for(let r = 0; r <= 10000; r++) {
          filter(numberMap, v => v % 2 == 0);
        }
        done();
      });
    });
  });
});
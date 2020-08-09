import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { reduceRight } from '@source/functions';

describe('Functions | reduceRight', () => {
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

  it('should concat the values RTL (testing values)', () => {
    const res = reduceRight(numberMap, (str, v) => `${str}${v}`, '_');

    // sum + 1 to test the initial
    expect(res).to.equal('_654321');
  });

  it('should concat all keys RTL (testing keys)', () => {
    const res = reduceRight(numberMap, (str, v, k) => `${str}${k}`, '_');

    // start with _ to test the initial
    expect(res).to.equal('_fedcba')
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
        reduceRight(numberMap, (sum, v) => sum + v, 0);
      }
      done();
    });
  });
});
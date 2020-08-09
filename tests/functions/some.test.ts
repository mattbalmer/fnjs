import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { some } from '@source/functions';

describe('Functions | some', () => {
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

  it('should test some > 5 (testing values)', () => {
    const res = some(numberMap, v => v > 5);

    expect(res).to.equal(true);
  });

  it('should test against some > 10 (testing values)', () => {
    const res = some(numberMap, v => v > 10);

    expect(res).to.equal(false);
  });

  it('should test some keys are allowed (testing keys)', () => {
    const allowedKeys = ['a', 'd'];
    const res = some(numberMap, (v, k) => allowedKeys.indexOf(k as string) > -1);

    expect(res).to.equal(true);
  });

  it('should test against some keys being allowed (testing keys)', () => {
    const allowedKeys = ['t', 'z'];
    const res = some(numberMap, (v, k) => allowedKeys.indexOf(k as string) > -1);

    expect(res).to.equal(false);
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
        some(numberMap, v => v > 9998);
      }
      done();
    });
  });
});
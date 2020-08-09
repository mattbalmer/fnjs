import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { mapKeys } from '@source/functions';

describe('Functions | mapKeys', () => {
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

  it('should multiply by 2 (testing values)', () => {
    const res = mapKeys(numberMap, (v, k) => (v * 2).toString());

    expect(res).to.deep.equal({
      2: 1,
      4: 2,
      6: 3,
      8: 4,
      10: 5,
      12: 6
    })
  });

  it('should prepend the key to the value (testing keys)', () => {
    const res = mapKeys(numberMap, (v, k) => `${k}${v}`);

    expect(res).to.deep.equal({
      a1: 1,
      b2: 2,
      c3: 3,
      d4: 4,
      e5: 5,
      f6: 6
    })
  });

  describe('[performance]', () => {
    let numberMap: StringRecord<number>;

    before(() => {
      numberMap = {};
      for(let i = 0; i <= 1000; i++) {
        numberMap[`${i}`] = i + 1;
      }
    });

    it('1000x10000', async (done) => {
      for(let r = 0; r <= 10000; r++) {
        mapKeys(numberMap, (v, k) => `${k}${v}`);
      }
      done();
    });
  });
});
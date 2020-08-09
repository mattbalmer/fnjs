import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { map } from '@source/functions';

describe('Functions | map', () => {
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
    const res = map<number>(numberMap, v => v * 2);

    expect(res).to.deep.equal({
      a: 2,
      b: 4,
      c: 6,
      d: 8,
      e: 10,
      f: 12
    })
  });

  it('should prepend the key to the value (testing keys)', () => {
    const res = map(numberMap, (v, k) => `${k}${v}`);

    expect(res).to.deep.equal({
      a: 'a1',
      b: 'b2',
      c: 'c3',
      d: 'd4',
      e: 'e5',
      f: 'f6'
    })
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
        map(numberMap, v => v + 1);
      }
      done();
    });
  });
});
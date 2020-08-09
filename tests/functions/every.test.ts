import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { every } from '@source/functions';

describe('Functions | every', () => {
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

  it('should test every > 0 (testing values)', () => {
    const res = every(numberMap, v => v > 0);

    expect(res).to.equal(true);
  });

  it('should test against every > 3 (testing values)', () => {
    const res = every(numberMap, v => v > 3);

    expect(res).to.equal(false);
  });

  it('should test every key is allowed (testing keys)', () => {
    const allowedKeys = ['a', 'b', 'c', 'd', 'e', 'f'];
    const res = every(numberMap, (v, k) => allowedKeys.indexOf(k) > -1);

    expect(res).to.equal(true);
  });

  it('should test against every key being allowed (testing keys)', () => {
    const allowedKeys = ['a', 'b', 'c', 'd', 'e'];
    const res = every(numberMap, (v, k) => allowedKeys.indexOf(k) > -1);

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
        every(numberMap, v => v > 9998);
      }
      done();
    });
  });
});
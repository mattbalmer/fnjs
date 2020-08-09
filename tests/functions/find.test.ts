import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { find } from '@source/functions';

describe('Functions | find', () => {
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

  it('should find 4 (testing values)', () => {
    const res = find(numberMap, v => v == 4);

    expect(res).to.equal(4);
  });

  it('should find c (testing keys)', () => {
    const res = find(numberMap, (v, k) => k == 'c');

    expect(res).to.equal(3);
  });

  it('should find undefined (testing false)', () => {
    // @ts-ignore
    const res = find(numberMap, v => v == 'FOOBAR');

    expect(res).to.equal(undefined);
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
        find(numberMap, v => v === 9998);
      }
      done();
    });
  });
});
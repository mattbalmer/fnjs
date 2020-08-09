import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { sort } from '@source/functions';

describe('Functions | sort', () => {
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

  it('should sort by descending value (testing values)', () => {
    expect(Object.keys(numberMap)).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f']);

    const res = sort(numberMap, (a, b) => b - a);

    expect(res).to.deep.equal({
      f: 6,
      e: 5,
      d: 4,
      c: 3,
      b: 2,
      a: 1
    });
    expect(Object.keys(res)).to.deep.equal(['f', 'e', 'd', 'c', 'b', 'a']);
  });

  it('should sort by descending alpha (testing keys)', () => {
    expect(Object.keys(numberMap)).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f']);

    const keys = ['a', 'b', 'c', 'd', 'e', 'f'];
    const res = sort(numberMap, (a, b, aKey, bKey) => keys.indexOf(bKey) - keys.indexOf(aKey));

    expect(res).to.deep.equal({
      f: 6,
      e: 5,
      d: 4,
      c: 3,
      b: 2,
      a: 1
    });
    expect(Object.keys(res)).to.deep.equal(['f', 'e', 'd', 'c', 'b', 'a']);
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
        sort(numberMap, (a, b) => b - a);
      }
      done();
    });
  });
});
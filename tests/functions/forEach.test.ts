import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { StringRecord } from '@source/types';
import { forEach } from '@source/functions';

describe('Functions | forEach', () => {
  it('should push to an array (testing keys & values)', () => {
    const numberMap = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6
    };

    const res: any[] = [];

    forEach(numberMap, (v, k) => res.push({ k, v }));

    expect(res).to.deep.equal([
      { k: 'a', v: 1 },
      { k: 'b', v: 2 },
      { k: 'c', v: 3 },
      { k: 'd', v: 4 },
      { k: 'e', v: 5 },
      { k: 'f', v: 6 }
    ]);
  });

  describe('[performance]', () => {
    let numberMap: StringRecord<number>;

    before(() => {
      numberMap = {};
      for(let i = 0; i <= 10000; i++) {
        numberMap[`${i}`] = i + 1;
      }
    })

    it('10000x10000', async (done) => {
      for(let r = 0; r <= 10000; r++) {
        const res = [];
        forEach(numberMap, (v, i) => res.push({ i, v }));
      }
      done();
    });
  });
});
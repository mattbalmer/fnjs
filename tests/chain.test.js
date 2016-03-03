import { expect } from 'chai';
import fn from '../source';

describe('chaining', () => {
    let numeralMap = {};

    beforeEach(() => {
        numeralMap = {
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
            let res = fn
                .chain(numeralMap)
                .filter(v => v % 2 == 0)
                .map(v => v * 2)
                .reduce((sum, v) => sum + v, 1)
                .value()
            ;

            // sum + 1 to test the initial
            expect(res).to.equal(25);
        });

        it('should return a strange string (testing keys)', () => {
            let allowedKeys = ['a', 'c', 'e'];
            let res = fn
                .chain(numeralMap)
                .filter((v, k) => allowedKeys.indexOf(k) > -1)
                .map((v, k) => `${k}${v}`)
                .reduce((str, v, k) => `${str}|${k}:${v}`, '_')
                .value()
            ;

            expect(res).to.equal('_|a:a1|c:c3|e:e5');
        });
    });
});
import { expect } from 'chai';
import fn from '../source';

describe('raw functions', () => {
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

    describe('filter', () => {
        it('should return even numbers (testing values)', () => {
            let res = fn.filter(numeralMap, v => v % 2 == 0);

            expect(res).to.deep.equal({
                b: 2,
                d: 4,
                f: 6
            })
        });

        it('should return even numbers (testing keys)', () => {
            let allowedKeys = ['a', 'c', 'e'];
            let res = fn.filter(numeralMap, (v, k) => allowedKeys.indexOf(k) > -1);

            expect(res).to.deep.equal({
                a: 1,
                c: 3,
                e: 5
            })
        });
    });

    describe('map', () => {
        it('should multiply by 2 (testing values)', () => {
            let res = fn.map(numeralMap, v => v * 2);

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
            let res = fn.map(numeralMap, (v, k) => `${k}${v}`);

            expect(res).to.deep.equal({
                a: 'a1',
                b: 'b2',
                c: 'c3',
                d: 'd4',
                e: 'e5',
                f: 'f6'
            })
        });
    });

    describe('reduce', () => {
        it('should sum the values (testing values)', () => {
            let res = fn.reduce(numeralMap, (sum, v) => sum + v, 1);

            // sum + 1 to test the initial
            expect(res).to.equal(22);
        });

        it('should concat all keys (testing keys)', () => {
            let res = fn.reduce(numeralMap, (str, v, k) => `${str}${k}`, '_');

            // start with _ to test the initial
            expect(res).to.equal('_abcdef')
        });
    });
});
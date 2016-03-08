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

    describe('forEach', () => {
        it('should push to an array (testing keys & values)', () => {
            let res = [];
            fn.forEach(numeralMap, (v, k) => res.push({ k, v }));

            expect(res).to.deep.equal([
                { k: 'a', v: 1 },
                { k: 'b', v: 2 },
                { k: 'c', v: 3 },
                { k: 'd', v: 4 },
                { k: 'e', v: 5 },
                { k: 'f', v: 6 }
            ])
        });
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

    describe('mapKeys', () => {
        it('should multiply by 2 (testing values)', () => {
            let res = fn.mapKeys(numeralMap, (v, k) => v * 2);

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
            let res = fn.mapKeys(numeralMap, (v, k) => `${k}${v}`);

            expect(res).to.deep.equal({
                a1: 1,
                b2: 2,
                c3: 3,
                d4: 4,
                e5: 5,
                f6: 6
            })
        });
    });

    describe('find', () => {
        it('should find 4 (testing values)', () => {
            let res = fn.find(numeralMap, v => v == 4);

            expect(res).to.equal(4);
        });

        it('should find c (testing keys)', () => {
            let res = fn.find(numeralMap, (v, k) => k == 'c');

            expect(res).to.equal(3);
        });
    });

    describe('findKey', () => {
        it('should find 4 (testing values)', () => {
            let res = fn.findKey(numeralMap, v => v == 4);

            expect(res).to.equal('d');
        });

        it('should find c (testing keys)', () => {
            let res = fn.findKey(numeralMap, (v, k) => k == 'c');

            expect(res).to.equal('c');
        });
    });

    describe('some', () => {
        it('should test some > 5 (testing values)', () => {
            let res = fn.some(numeralMap, v => v > 5);

            expect(res).to.equal(true);
        });

        it('should test against some > 10 (testing values)', () => {
            let res = fn.some(numeralMap, v => v > 10);

            expect(res).to.equal(false);
        });

        it('should test some keys are allowed (testing keys)', () => {
            let allowedKeys = ['a', 'd'];
            let res = fn.some(numeralMap, (v, k) => allowedKeys.indexOf(k) > -1);

            expect(res).to.equal(true);
        });

        it('should test against some keys being allowed (testing keys)', () => {
            let allowedKeys = ['t', 'z'];
            let res = fn.some(numeralMap, (v, k) => allowedKeys.indexOf(k) > -1);

            expect(res).to.equal(false);
        });
    });

    describe('every', () => {
        it('should test every > 0 (testing values)', () => {
            let res = fn.every(numeralMap, v => v > 0);

            expect(res).to.equal(true);
        });

        it('should test against every > 3 (testing values)', () => {
            let res = fn.every(numeralMap, v => v > 3);

            expect(res).to.equal(false);
        });

        it('should test every key is allowed (testing keys)', () => {
            let allowedKeys = ['a', 'b', 'c', 'd', 'e', 'f'];
            let res = fn.every(numeralMap, (v, k) => allowedKeys.indexOf(k) > -1);

            expect(res).to.equal(true);
        });

        it('should test against every key being allowed (testing keys)', () => {
            let allowedKeys = ['a', 'b', 'c', 'd', 'e'];
            let res = fn.every(numeralMap, (v, k) => allowedKeys.indexOf(k) > -1);

            expect(res).to.equal(false);
        });
    });

    describe('sort', () => {
        it('should sort by descending value (testing values)', () => {
            let res = fn.sort(numeralMap, (a, b) => b - a);

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
            let keys = ['a', 'b', 'c', 'd', 'e', 'f'];
            let res = fn.sort(numeralMap, (a, b, akey, bkey) => keys.indexOf(bkey) - keys.indexOf(akey));

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

    describe('reduceRight', () => {
        it('should concat the values RTL (testing values)', () => {
            let res = fn.reduceRight(numeralMap, (str, v) => `${str}${v}`, '_');

            // sum + 1 to test the initial
            expect(res).to.equal('_654321');
        });

        it('should concat all keys RTL (testing keys)', () => {
            let res = fn.reduceRight(numeralMap, (str, v, k) => `${str}${k}`, '_');

            // start with _ to test the initial
            expect(res).to.equal('_fedcba')
        });
    });
});
import { extend } from './lib/objects';
import * as functions from './functions';

export function collection(_collection) {
    return extend(Object.create({
        valueOf() {
            return this.collection
        },
        forEach(callback) {
            return collection(functions.forEach(this, callback));
        },
        some(callback) {
            return functions.some(this.collection, callback);
        },
        every(callback) {
            return functions.every(this.collection, callback);
        },
        find(callback) {
            return functions.find(this.collection, callback);
        },
        findKey(callback) {
            return functions.findKey(this.collection, callback);
        },
        filter(callback) {
            return collection(functions.filter(this, callback));
        },
        sort(callback) {
            return collection(functions.sort(this, callback));
        },
        map(callback) {
            return collection(functions.map(this, callback));
        },
        mapKeys(callback) {
            return collection(functions.mapKeys(this, callback));
        },
        reduce(callback, initial) {
            let res = functions.reduce(this, callback, initial);
            return typeof res === 'object' ? collection(res) : res;
        },
        reduceRight(callback, initial) {
            let res = functions.reduceRight(this, callback, initial);
            return typeof res === 'object' ? collection(res) : res;
        }
    }), _collection);
}
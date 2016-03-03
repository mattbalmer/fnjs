import { extend } from './lib/objects';
import * as functions from './functions';

export function collection(_collection) {
    return extend(Object.create({
        valueOf() {
            return this.collection
        },
        filter(callback) {
            return collection(functions.filter(this, callback));
        },
        map(callback) {
            return collection(functions.map(this, callback));
        },
        reduce(callback, initial) {
            let res = functions.reduce(this, callback, initial);
            return typeof res === 'object' ? collection(res) : res;
        }
    }), _collection);
}
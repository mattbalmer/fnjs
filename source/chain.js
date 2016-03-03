import { collection } from './collection';
import * as functions from './functions';

export function chain(_collection) {
    return Object.create({
        filter(callback) {
            this.collection = collection(functions.filter(this.collection, callback));
            return this;
        },
        map(callback) {
            this.collection = collection(functions.map(this.collection, callback));
            return this;
        },
        reduce(callback, initial) {
            this.collection = functions.reduce(this.collection, callback, initial);
            return this;
        },
        value() {
            return this.collection;
        }
    }, {
        collection: {
            value: _collection,
            writable: true,
            enumerable: true,
            configurable: true
        }
    });
}

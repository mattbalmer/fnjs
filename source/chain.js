import * as functions from './functions';

export function chain(_collection) {
    return Object.create({
        forEach(callback) {
            functions.forEach(this.collection, callback);
            return this;
        },
        some(callback) {
            this.collection = functions.some(this.collection, callback);
            return this;
        },
        every(callback) {
            this.collection = functions.every(this.collection, callback);
            return this;
        },
        find(callback) {
            this.collection = functions.find(this.collection, callback);
            return this;
        },
        findKey(callback) {
            this.collection = functions.findKey(this.collection, callback);
            return this;
        },
        filter(callback) {
            this.collection = functions.filter(this.collection, callback);
            return this;
        },
        map(callback) {
            this.collection = functions.map(this.collection, callback);
            return this;
        },
        reduce(callback, initial) {
            this.collection = functions.reduce(this.collection, callback, initial);
            return this;
        },
        reduceRight(callback, initial) {
            this.collection = functions.reduceRight(this.collection, callback, initial);
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

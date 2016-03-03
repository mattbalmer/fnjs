'use strict';

function extend(src, ...objects) {
    for(let i in objects) {
        if(!objects.hasOwnProperty(i)) continue;
        let obj = objects[i];
        for(let key in obj) {
            if(!obj.hasOwnProperty(key)) continue;
            if(obj[key] && typeof obj[key] == 'object' && obj[key].constructor == Object) {
                src[key] = extend({}, obj[key]);
            } else {
                src[key] = obj[key];
            }
        }
    }
    return src;
}

function collect(collection) {
    return Object.keys(collection)
        .map((key, i, keys) => ({value: collection[key], key}));
}

function forEach(collection, callback) {
    Array.isArray(collection) ? collection.forEach(callback) : collect(collection)
        .forEach((entry, i, collection) => callback(entry.value, entry.key, collection))
    return collection;
}

function filter(collection, callback) {
    return Array.isArray(collection) ? collection.filter(callback) : collect(collection)
        .filter((entry, i, collection) => callback(entry.value, entry.key, collection))
        .reduce((collection, entry) => {
            collection[entry.key] = entry.value;
            return collection;
        }, {});
}

function map(collection, callback) {
    return Array.isArray(collection) ? collection.map(callback) : collect(collection)
        .map((entry, i, collection) => {
            entry.value = callback(entry.value, entry.key, collection);
            return entry;
        })
        .reduce((collection, entry) => {
            collection[entry.key] = entry.value;
            return collection;
        }, {});
}

function reduce(collection, callback, initial) {
    return Array.isArray(collection) ? collection.reduce(callback, initial || []) : collect(collection)
        .reduce((sum, entry, i, collection) => callback(sum, entry.value, entry.key, collection), initial === undefined ? {} : initial)
}

function collection(_collection) {
    return extend(Object.create({
        valueOf() {
            return this.collection
        },
        forEach(callback) {
            return collection(forEach(this, callback));
        },
        filter(callback) {
            return collection(filter(this, callback));
        },
        map(callback) {
            return collection(map(this, callback));
        },
        reduce(callback, initial) {
            let res = reduce(this, callback, initial);
            return typeof res === 'object' ? collection(res) : res;
        }
    }), _collection);
}

function chain(_collection) {
    return Object.create({
        forEach(callback) {
            forEach(this.collection, callback);
            return this;
        },
        filter(callback) {
            this.collection = filter(this.collection, callback);
            return this;
        },
        map(callback) {
            this.collection = map(this.collection, callback);
            return this;
        },
        reduce(callback, initial) {
            this.collection = reduce(this.collection, callback, initial);
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

function close() {
    return this.collection;
}

function pipe(func, ...args) {
    let collection = typeof func !== 'function' ? func
        : func.apply(func, [this.collection].concat(args));

    return {
        collection,
        pipe: pipe.bind({ collection }),
        close: close.bind({ collection })
    }
}

function open(collection) {
    return {
        collection,
        pipe: pipe.bind({ collection }),
        close: close.bind({ collection: this.collection })
    }
}

function fn(_collection) {
    return collection(_collection);
}
fn.collection = collection;
fn.chain = chain;

fn.collect = collect;

fn.open = open;
fn.pipe = pipe;
fn.close = close;

fn.forEach = forEach;
fn.filter = filter;
fn.map = map;
fn.reduce = reduce;

if(typeof window !== 'undefined') { window.fn = fn }
if(typeof module !== 'undefined') { module.exports = fn }
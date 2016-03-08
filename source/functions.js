import { collect, uncollect } from './utils';

export function forEach(collection, callback) {
    Array.isArray(collection) ? collection.forEach(callback) : collect(collection)
        .forEach((entry, i, collection) => callback(entry.value, entry.key, collection))
    return collection;
}

export function filter(collection, callback) {
    if(Array.isArray(collection)) return collection.filter(callback);

    let result = collect(collection)
        .filter((entry, i, collection) => callback(entry.value, entry.key, collection));

    return uncollect(result);
}

export function every(collection, callback) {
    if(Array.isArray(collection)) return collection.every(callback);

    let result = collect(collection)
        .every((entry, i, collection) => callback(entry.value, entry.key, collection));

    return result;
}

export function some(collection, callback) {
    if(Array.isArray(collection)) return collection.some(callback);

    let result = collect(collection)
        .some((entry, i, collection) => callback(entry.value, entry.key, collection));

    return result;
}

export function find(collection, callback) {
    if(Array.isArray(collection)) return collection.find(callback);

    let result = collect(collection)
        .find((entry, i, collection) => callback(entry.value, entry.key, collection));

    return result.value;
}

export function findKey(collection, callback) {
    if(Array.isArray(collection)) return collection.findIndex(callback);

    collection = collect(collection)

    let index = collection
        .findIndex((entry, i, collection) => callback(entry.value, entry.key, collection));

    return collection[index].key;
}

export function sort(collection, callback) {
    if(Array.isArray(collection)) return collection.map(callback);
    collection = collect(collection);

    let result = collection
        .sort((a, b) => callback(a.value, b.value, a.key, b.key, collection));

    return uncollect(result);
}

export function map(collection, callback) {
    if(Array.isArray(collection)) return collection.map(callback);

    let result = collect(collection)
        .map((entry, i, collection) => {
            entry.value = callback(entry.value, entry.key, collection);
            return entry;
        });

    return uncollect(result);
}

export function mapKeys(collection, callback) {
    if(Array.isArray(collection)) return collection.map(callback);

    let result = collect(collection)
        .map((entry, i, collection) => {
            entry.key = callback(entry.value, entry.key, collection);
            return entry;
        });

    return uncollect(result);
}

export function reduce(collection, callback, initial) {
    if(Array.isArray(collection)) return collection.reduce(callback, initial);

    return collect(collection)
        .reduce((sum, entry, i, collection) => callback(sum, entry.value, entry.key, collection), initial)
}

export function reduceRight(collection, callback, initial) {
    if(Array.isArray(collection)) return collection.reduceRight(callback, initial);

    return collect(collection)
        .reduceRight((sum, entry, i, collection) => callback(sum, entry.value, entry.key, collection), initial)
}
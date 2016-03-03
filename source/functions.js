import { collect } from './utils';

export function forEach(collection, callback) {
    Array.isArray(collection) ? collection.forEach(callback) : collect(collection)
        .forEach((entry, i, collection) => callback(entry.value, entry.key, collection))
    return collection;
}

export function filter(collection, callback) {
    return Array.isArray(collection) ? collection.filter(callback) : collect(collection)
        .filter((entry, i, collection) => callback(entry.value, entry.key, collection))
        .reduce((collection, entry) => {
            collection[entry.key] = entry.value;
            return collection;
        }, {});
}

export function map(collection, callback) {
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

export function reduce(collection, callback, initial) {
    return Array.isArray(collection) ? collection.reduce(callback, initial) : collect(collection)
        .reduce((sum, entry, i, collection) => callback(sum, entry.value, entry.key, collection), initial === undefined ? 0 : initial)
}
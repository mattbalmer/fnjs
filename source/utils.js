export function collect(collection) {
    return Object.keys(collection)
        .map((key, i, keys) => ({value: collection[key], key}));
}

export function uncollect(collection) {
    return collection.reduce((collection, entry) => {
        collection[entry.key] = entry.value;
        return collection;
    }, {});
}
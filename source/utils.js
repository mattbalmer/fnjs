export function collect(collection) {
    return Object.keys(collection)
        .map((key, i, keys) => ({value: collection[key], key}));
}

export function close() {
    return this.collection;
}

export function pipe(func, ...args) {
    let collection = typeof func !== 'function' ? func
        : func.apply(func, [this.collection].concat(args));

    return {
        collection,
        pipe: pipe.bind({ collection }),
        close: close.bind({ collection })
    }
}

export function open(collection) {
    return {
        collection,
        pipe: pipe.bind({ collection }),
        close: close.bind({ collection: this.collection })
    }
}
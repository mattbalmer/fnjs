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

function uncollect(collection) {
  return collection.reduce((collection, entry) => {
    collection[entry.key] = entry.value;
    return collection;
  }, {});
}

function forEach(collection, callback) {
  Array.isArray(collection) ? collection.forEach(callback) : collect(collection)
    .forEach((entry, i, collection) => callback(entry.value, entry.key, collection))
  return collection;
}

function filter(collection, callback) {
  if(Array.isArray(collection)) return collection.filter(callback);

  let result = collect(collection)
    .filter((entry, i, collection) => callback(entry.value, entry.key, collection));

  return uncollect(result);
}

function every(collection, callback) {
  if(Array.isArray(collection)) return collection.every(callback);

  let result = collect(collection)
    .every((entry, i, collection) => callback(entry.value, entry.key, collection));

  return result;
}

function some(collection, callback) {
  if(Array.isArray(collection)) return collection.some(callback);

  let result = collect(collection)
    .some((entry, i, collection) => callback(entry.value, entry.key, collection));

  return result;
}

function find(collection, callback) {
  if(Array.isArray(collection)) return collection.find(callback);

  let result = collect(collection)
    .find((entry, i, collection) => callback(entry.value, entry.key, collection));

  return result ? result.value : undefined;
}

function findKey(collection, callback) {
  if(Array.isArray(collection)) return collection.findIndex(callback);

  collection = collect(collection);

  let index = collection
    .findIndex((entry, i, collection) => callback(entry.value, entry.key, collection));

  return index > -1 ? collection[index].key : undefined;
}

function sort(collection, callback) {
  if(Array.isArray(collection)) return collection.map(callback);
  collection = collect(collection);

  let result = collection
    .sort((a, b) => callback(a.value, b.value, a.key, b.key, collection));

  return uncollect(result);
}

function map(collection, callback) {
  if(Array.isArray(collection)) return collection.map(callback);

  let result = collect(collection)
    .map((entry, i, collection) => {
      entry.value = callback(entry.value, entry.key, collection);
      return entry;
    });

  return uncollect(result);
}

function mapKeys(collection, callback) {
  if(Array.isArray(collection)) return collection.map(callback);

  let result = collect(collection)
    .map((entry, i, collection) => {
      entry.key = callback(entry.value, entry.key, collection);
      return entry;
    });

  return uncollect(result);
}

function reduce(collection, callback, initial) {
  if(Array.isArray(collection)) return collection.reduce(callback, initial);

  return collect(collection)
    .reduce((sum, entry, i, collection) => callback(sum, entry.value, entry.key, collection), initial)
}

function reduceRight(collection, callback, initial) {
  if(Array.isArray(collection)) return collection.reduceRight(callback, initial);

  return collect(collection)
    .reduceRight((sum, entry, i, collection) => callback(sum, entry.value, entry.key, collection), initial)
}

function collection(_collection) {
  return extend(Object.create({
    valueOf() {
      return this.collection
    },
    forEach(callback) {
      return collection(forEach(this, callback));
    },
    some(callback) {
      return some(this.collection, callback);
    },
    every(callback) {
      return every(this.collection, callback);
    },
    find(callback) {
      return find(this.collection, callback);
    },
    findKey(callback) {
      return findKey(this.collection, callback);
    },
    sort(callback) {
      return collection(sort(this, callback));
    },
    filter(callback) {
      return collection(filter(this, callback));
    },
    map(callback) {
      return collection(map(this, callback));
    },
    mapKeys(callback) {
      return collection(mapKeys(this, callback));
    },
    reduce(callback, initial) {
      let res = reduce(this, callback, initial);
      return typeof res === 'object' ? collection(res) : res;
    },
    reduceRight(callback, initial) {
      let res = reduceRight(this, callback, initial);
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
    some(callback) {
      this.collection = some(this.collection, callback);
      return this;
    },
    every(callback) {
      this.collection = every(this.collection, callback);
      return this;
    },
    find(callback) {
      this.collection = find(this.collection, callback);
      return this;
    },
    findKey(callback) {
      this.collection = findKey(this.collection, callback);
      return this;
    },
    sort(callback) {
      this.collection = sort(this.collection, callback);
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
    mapKeys(callback) {
      this.collection = mapKeys(this.collection, callback);
      return this;
    },
    reduce(callback, initial) {
      this.collection = reduce(this.collection, callback, initial);
      return this;
    },
    reduceRight(callback, initial) {
      this.collection = reduceRight(this.collection, callback, initial);
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
fn.find = find;
fn.findKey = findKey;
fn.some = some;
fn.every = every;
fn.sort = sort;
fn.filter = filter;
fn.map = map;
fn.mapKeys = mapKeys;
fn.reduce = reduce;
fn.reduceRight = reduceRight;

module.exports = fn;
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function extend(src) {
    for (var _len = arguments.length, objects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        objects[_key - 1] = arguments[_key];
    }

    for (var i in objects) {
        if (!objects.hasOwnProperty(i)) continue;
        var obj = objects[i];
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            if (obj[key] && _typeof(obj[key]) == 'object' && obj[key].constructor == Object) {
                src[key] = extend({}, obj[key]);
            } else {
                src[key] = obj[key];
            }
        }
    }
    return src;
}

function collect(collection) {
    return Object.keys(collection).map(function (key, i, keys) {
        return { value: collection[key], key: key };
    });
}

function _forEach(collection, callback) {
    Array.isArray(collection) ? collection.forEach(callback) : collect(collection).forEach(function (entry, i, collection) {
        return callback(entry.value, entry.key, collection);
    });
    return collection;
}

function _filter(collection, callback) {
    return Array.isArray(collection) ? collection.filter(callback) : collect(collection).filter(function (entry, i, collection) {
        return callback(entry.value, entry.key, collection);
    }).reduce(function (collection, entry) {
        collection[entry.key] = entry.value;
        return collection;
    }, {});
}

function _map(collection, callback) {
    return Array.isArray(collection) ? collection.map(callback) : collect(collection).map(function (entry, i, collection) {
        entry.value = callback(entry.value, entry.key, collection);
        return entry;
    }).reduce(function (collection, entry) {
        collection[entry.key] = entry.value;
        return collection;
    }, {});
}

function _reduce(collection, callback, initial) {
    return Array.isArray(collection) ? collection.reduce(callback, initial || []) : collect(collection).reduce(function (sum, entry, i, collection) {
        return callback(sum, entry.value, entry.key, collection);
    }, initial === undefined ? {} : initial);
}

function collection(_collection) {
    return extend(Object.create({
        valueOf: function valueOf() {
            return this.collection;
        },
        forEach: function forEach(callback) {
            return collection(_forEach(this, callback));
        },
        filter: function filter(callback) {
            return collection(_filter(this, callback));
        },
        map: function map(callback) {
            return collection(_map(this, callback));
        },
        reduce: function reduce(callback, initial) {
            var res = _reduce(this, callback, initial);
            return (typeof res === 'undefined' ? 'undefined' : _typeof(res)) === 'object' ? collection(res) : res;
        }
    }), _collection);
}

function chain(_collection) {
    return Object.create({
        forEach: function forEach(callback) {
            _forEach(this.collection, callback);
            return this;
        },
        filter: function filter(callback) {
            this.collection = _filter(this.collection, callback);
            return this;
        },
        map: function map(callback) {
            this.collection = _map(this.collection, callback);
            return this;
        },
        reduce: function reduce(callback, initial) {
            this.collection = _reduce(this.collection, callback, initial);
            return this;
        },
        value: function value() {
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

function pipe(func) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    var collection = typeof func !== 'function' ? func : func.apply(func, [this.collection].concat(args));

    return {
        collection: collection,
        pipe: pipe.bind({ collection: collection }),
        close: close.bind({ collection: collection })
    };
}

function open(collection) {
    return {
        collection: collection,
        pipe: pipe.bind({ collection: collection }),
        close: close.bind({ collection: this.collection })
    };
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

fn.forEach = _forEach;
fn.filter = _filter;
fn.map = _map;
fn.reduce = _reduce;

if (typeof window !== 'undefined') {
    window.fn = fn;
}
if (typeof module !== 'undefined') {
    module.exports = fn;
}

},{}]},{},[1]);

import { extend } from './utils/objects';
import * as functions from './functions';
import { StringRecord, TodoAny } from './types';

export function collection<T, O = StringRecord<T>>(_collection: StringRecord<T>) {
  return extend(Object.create({
    valueOf(): O {
      return this.collection
    },
    forEach(callback: TodoAny) {
      return collection(functions.forEach(this, callback));
    },
    some(callback: TodoAny) {
      return functions.some(this.collection, callback);
    },
    every(callback: TodoAny) {
      return functions.every(this.collection, callback);
    },
    find(callback: TodoAny) {
      return functions.find(this.collection, callback);
    },
    findKey(callback: TodoAny) {
      return functions.findKey(this.collection, callback);
    },
    filter(callback: TodoAny) {
      return collection(functions.filter(this, callback));
    },
    sort(callback: TodoAny) {
      return collection(functions.sort(this, callback));
    },
    map(callback: TodoAny) {
      return collection(functions.map(this, callback));
    },
    mapKeys(callback: TodoAny) {
      return collection(functions.mapKeys(this, callback));
    },
    reduce(callback: TodoAny, initial: TodoAny) {
      let res = functions.reduce(this, callback, initial);
      return typeof res === 'object' ? collection(res) : res;
    },
    reduceRight(callback: TodoAny, initial: TodoAny) {
      let res = functions.reduceRight(this, callback, initial);
      return typeof res === 'object' ? collection(res) : res;
    }
  }), _collection);
}
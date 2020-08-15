import { StringRecord } from '../types';
import { collect } from '../utils/collections';

export interface forEachCallback<T> {
  (entry: T, key: string, collection: StringRecord<T>): unknown
}

/**
 * Runs a callback for every entry in the collection.
 */
export function forEach<T>(object: StringRecord<T>, callback: forEachCallback<T>): StringRecord<T> {
  const keys = Object.keys(object);

  keys
    .forEach((key) => {
      const value = object[key];
      callback(value, key, object);
    });

  return object;
}

import { StringRecord } from '../types';
import { collect } from '../utils/collections';

export interface forEachCallback<T> {
  (entry: T, key: string, collection: StringRecord<T>): unknown
}

/**
 * Runs a callback for every entry in the collection.
 */
export function forEach<T>(object: StringRecord<T>, callback: forEachCallback<T>): StringRecord<T> {
  const collection = collect(object);

  collection
    .forEach((entry) => {
      callback(entry.value, entry.key, object);
    });

  return object;
}

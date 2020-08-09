import { StringRecord } from '../types';
import { collect, uncollect } from '../utils/collections';

export interface filterPredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

/**
 * Filter entries in a collection
 */
export function filter<T>(object: StringRecord<T>, callback: filterPredicate<T>): StringRecord<T> {
  const collection = collect(object);

  const result = collection
    .filter((entry) => callback(entry.value, entry.key, object));

  return uncollect(result);
}
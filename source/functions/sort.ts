import { StringRecord } from '../types';
import { collect, uncollect } from '../utils/collections';

export interface sortCallback<T> {
  (a: T, b: T, aKey: string, bKey: string, collection: StringRecord<T>): number
}

/**
 * Re-sorts object entry order.
 */
export function sort<T>(object: StringRecord<T>, callback: sortCallback<T>): StringRecord<T> {
  const collection = collect(object);

  const result = collection
    .sort((a, b) => callback(a.value, b.value, a.key, b.key, object));

  return uncollect(result);
}
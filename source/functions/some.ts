import { StringRecord } from '../types';
import { collect } from '../utils/collections';

export interface somePredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

/**
 * Returns true if any entries in a collection meets the criteria
 */
export function some<T>(object: StringRecord<T>, callback: somePredicate<T>): boolean {
  const collection = collect(object);

  return collection
    .some((entry) => callback(entry.value, entry.key, object));
}
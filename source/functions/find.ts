import { StringRecord } from '../types';
import { collect } from '../utils/collections';

export interface findPredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

/**
 * Finds the first value where the entry matches the criteria
 */
export function find<T>(collection: StringRecord<T>, callback: findPredicate<T>): T | undefined {
  let result = collect(collection)
    .find((entry) => callback(entry.value, entry.key, collection));

  return result ? result.value : undefined;
}
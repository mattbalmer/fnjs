import { StringRecord } from '../types';
import { collect } from '../utils/collections';

export interface findKeyPredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

/**
 * Finds the first key where the entry matches the criteria
 */
export function findKey<T>(object: StringRecord<T>, callback: findKeyPredicate<T>): string | undefined {
  const collection = collect(object);

  const index = collection
    .findIndex((entry) => callback(entry.value, entry.key, object));

  return index > -1 ? collection[index].key : undefined;
}
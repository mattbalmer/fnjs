import { StringRecord } from '../types';
import { collect, uncollect } from '../utils/collections';

export interface mapKeysTransform<T> {
  (value: T, key: string, collection: StringRecord<T>): string
}

/**
 * Maps the keys to another value
 */
export function mapKeys<T>(object: StringRecord<T>, callback: mapKeysTransform<T>): StringRecord<T> {
  const collection = collect(object);

  const result = collection
    .map((entry) => {
      entry.key = callback(entry.value, entry.key, object);
      return entry;
    });

  return uncollect(result);
}
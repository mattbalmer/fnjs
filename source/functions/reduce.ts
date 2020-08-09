import { StringRecord } from '../types';
import { collect } from '../utils/collections';

export interface reduceTransform<T, O> {
  (accumulator: O, value: T, key: string, collection: StringRecord<T>): O
}

/**
 * Reduce an object to a different value
 */
export function reduce<T, O>(object: StringRecord<T>, callback: reduceTransform<T, O>, initial?: O): O {
  const collection = collect(object);

  return collection
    .reduce((sum, entry) => callback(sum, entry.value, entry.key, object), initial)
}
import { StringRecord } from '../types';
import { collect } from '../utils/collections';

export interface reduceRightTransform<T, O> {
  (accumulator: O, value: T, key: string, collection: StringRecord<T>): O
}

/**
 * Reduce an object to a different value (from right direction)
 */
export function reduceRight<T, O>(object: StringRecord<T>, callback: reduceRightTransform<T, O>, initial?: O): O {
  const collection = collect(object);

  return collection
    .reduceRight((sum, entry) => callback(sum, entry.value, entry.key, object), initial)
}
import { StringRecord } from '../types';

export interface reduceRightTransform<T, O> {
  (accumulator: O, value: T, key: string, collection: StringRecord<T>): O
}

/**
 * Reduce an object to a different value (from right direction)
 */
export function reduceRight<T, O>(object: StringRecord<T>, callback: reduceRightTransform<T, O>, initial?: O): O {
  return Object.keys(object)
    .reduceRight((accumulator, key) => {
      const value = object[key];
      return callback(accumulator, value, key, object);
    }, initial);
}
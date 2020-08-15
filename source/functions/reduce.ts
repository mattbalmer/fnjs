import { StringRecord } from '../types';

export interface reduceTransform<T, O> {
  (accumulator: O, value: T, key: string, collection: StringRecord<T>): O
}

/**
 * Reduce an object to a different value
 */
export function reduce<T, O>(object: StringRecord<T>, callback: reduceTransform<T, O>, initial?: O): O {
  return Object.keys(object)
    .reduce((accumulator, key) => {
      const value = object[key];
      return callback(accumulator, value, key, object);
    }, initial);
}
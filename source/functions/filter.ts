import { StringRecord } from '../types';

export interface filterPredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

/**
 * Filter entries in a collection
 */
export function filter<T>(object: StringRecord<T>, callback: filterPredicate<T>): StringRecord<T> {
  return Object.keys(object)
    .reduce((result, key) => {
      const value = object[key];
      const shouldKeep = callback(value, key, object);
      if (shouldKeep) {
        result[key] = value;
      }
      return result;
    }, {} as StringRecord<T>);
}
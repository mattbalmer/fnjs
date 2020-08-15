import { StringRecord } from '../types';

export interface mapKeysTransform<T> {
  (value: T, key: string, collection: StringRecord<T>): string
}

/**
 * Maps the keys to another value
 */
export function mapKeys<T>(object: StringRecord<T>, callback: mapKeysTransform<T>): StringRecord<T> {
  return Object.keys(object)
    .reduce((result, key) => {
      const value = object[key];
      const newKey = callback(value, key, object);
      result[newKey] = value;
      return result;
    }, {} as StringRecord<T>)
}
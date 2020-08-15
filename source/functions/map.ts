import { StringRecord } from '../types';

export interface mapTransform<T, NT> {
  (value: T, key: string, collection: StringRecord<T>): NT
}

/**
 * Maps values to another value
 */
export function map<T, NT = T>(object: StringRecord<T>, callback: mapTransform<T, NT>): StringRecord<NT> {
  return Object.keys(object)
    .reduce((result, key) => {
      const value = object[key];
      result[key] = callback(value, key, object);
      return result;
    }, {} as StringRecord<NT>)
}
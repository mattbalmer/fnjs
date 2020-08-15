import { StringRecord } from '../types';

export interface findPredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

/**
 * Finds the first value where the entry matches the criteria
 */
export function find<T>(object: StringRecord<T>, callback: findPredicate<T>): T | undefined {
  const keys = Object.keys(object);

  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];

    const isValid = callback(value, key, object);

    if (isValid) {
      return value;
    }
  }

  return undefined;
}
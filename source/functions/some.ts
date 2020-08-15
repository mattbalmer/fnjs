import { StringRecord } from '../types';

export interface somePredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

/**
 * Returns true if any entries in a collection meets the criteria
 */
export function some<T>(object: StringRecord<T>, callback: somePredicate<T>): boolean {
  const keys = Object.keys(object);

  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];

    const isValid = callback(value, key, object);

    if (isValid) {
      return true;
    }
  }

  return false;
}
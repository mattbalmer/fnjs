import { StringRecord } from '../types';

export interface findKeyPredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

/**
 * Finds the first key where the entry matches the criteria
 */
export function findKey<T>(object: StringRecord<T>, callback: findKeyPredicate<T>): string | undefined {
  const keys = Object.keys(object);

  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];

    const isValid = callback(value, key, object);

    if (isValid) {
      return key;
    }
  }

  return undefined;
}
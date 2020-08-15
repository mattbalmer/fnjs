import { StringRecord } from '../types';

export interface everyPredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

export function every<T>(object: StringRecord<T>, callback: everyPredicate<T>): boolean {
  const keys = Object.keys(object);

  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];

    const isValid = callback(value, key, object);

    if (!isValid) {
      return false;
    }
  }

  return true;
}

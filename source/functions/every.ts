import { StringRecord } from '../types';
import { collect } from '../utils/collections';

export interface everyPredicate<T> {
  (entry: T, key: string, collection: StringRecord<T>): boolean
}

export function every<T>(object: StringRecord<T>, callback: everyPredicate<T>): boolean {
  const collection = collect(object);

  return collection
    .every((entry) => callback(entry.value, entry.key, object));
}

import { Collection, StringRecord } from '../types';
import { collect, uncollect } from '../utils/collections';

export interface mapTransform<T, NT> {
  (value: T, key: string, collection: StringRecord<T>): NT
}

/**
 * Maps values to another value
 */
export function map<T, NT = T>(object: StringRecord<T>, callback: mapTransform<T, NT>): StringRecord<NT> {
  const collection = collect<T | NT>(object);

  const result = collection
    .map((entry) => {
      entry.value = callback(entry.value as T, entry.key, object);
      return entry;
    });

  return uncollect<NT>(result as Collection<NT>);
}
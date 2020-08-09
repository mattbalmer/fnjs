import { Collection, StringRecord } from '@source/types';

export function collect<T>(object: StringRecord<T>): Collection<T> {
  return Object.keys(object)
    .map((key) => ({ value: object[key], key }));
}

export function uncollect<T>(collection: Collection<T>): StringRecord<T> {
  return collection.reduce((collection, entry) => {
    collection[entry.key] = entry.value;
    return collection;
  }, {} as StringRecord<T>);
}
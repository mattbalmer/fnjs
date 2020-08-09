import { StringRecord, TodoAny } from '@source/types';

class Pipe<T, O = StringRecord<T>> {
  collection: StringRecord<T>;

  constructor(collection: StringRecord<T>) {
    this.collection = collection;
  }

  pipe(func: TodoAny, ...args: TodoAny[]): Pipe<T, O> {
    this.collection = func(this.collection, ...args);
    return this;
  }

  close() {
    return this.collection;
  }
}

export function open<T, O = T>(object: StringRecord<T>): Pipe<T, O> {
  return new Pipe<T, O>(object);
}
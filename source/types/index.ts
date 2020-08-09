export type TodoAny = any;

export type StringRecord<T extends any = any> = Record<string, T>

export type CollectionEntry<T extends any = any> = {
  key: string,
  value: T,
}

export type Collection<T extends any = any> = CollectionEntry<T>[]
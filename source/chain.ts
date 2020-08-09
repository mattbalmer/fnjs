import * as functions from './functions';
import { StringRecord } from './types';

type CurriedParameters<T extends (...args: any) => any> = T extends (firstArg: any, ...args: infer P) => any ? P : never;

export function chain<T extends any = any>(collection: StringRecord<T>) {
  return Object.create({
    forEach(...args: CurriedParameters<typeof functions.forEach>) {
      functions.forEach(this.collection, ...args);
      return this;
    },
    some(...args: CurriedParameters<typeof functions.some>) {
      this.collection = functions.some(this.collection, ...args);
      return this;
    },
    every(...args: CurriedParameters<typeof functions.every>) {
      this.collection = functions.every(this.collection, ...args);
      return this;
    },
    find(...args: CurriedParameters<typeof functions.find>) {
      this.collection = functions.find(this.collection, ...args);
      return this;
    },
    findKey(...args: CurriedParameters<typeof functions.findKey>) {
      this.collection = functions.findKey(this.collection, ...args);
      return this;
    },
    sort(...args: CurriedParameters<typeof functions.sort>) {
      this.collection = functions.sort(this.collection, ...args);
      return this;
    },
    filter(...args: CurriedParameters<typeof functions.filter>) {
      this.collection = functions.filter(this.collection, ...args);
      return this;
    },
    map(...args: CurriedParameters<typeof functions.map>) {
      this.collection = functions.map(this.collection, ...args);
      return this;
    },
    mapKeys(...args: CurriedParameters<typeof functions.mapKeys>) {
      this.collection = functions.mapKeys(this.collection, ...args);
      return this;
    },
    reduce(...args: CurriedParameters<typeof functions.reduce>) {
      this.collection = functions.reduce(this.collection, ...args);
      return this;
    },
    reduceRight(...args: CurriedParameters<typeof functions.reduceRight>) {
      this.collection = functions.reduceRight(this.collection, ...args);
      return this;
    },
    value() {
      return this.collection;
    }
  }, {
    collection: {
      value: collection,
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
}

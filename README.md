# fn.js

Recreate common functional array methods for objects.

## Support

This library currently supports

* forEach
* some
* every
* find
* findKey
* filter
* map
* mapKeys
* reduce
* reduceRight

## Examples

All following examples return `25`.

### Plain functions

Using the plain functions.

    fn.reduce(
        fn.map(
            fn.filter({
              a: 1,
              b: 2,
              c: 3,
              d: 4,
              e: 5,
              f: 6
            },
            (v) => v % 2 == 0),
        (v) => v * 2),
    (sum, v) => v + sum, 1);

### Chaining

Using the chain function.

    fn.chain({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6
    })
    .filter(v => v % 2 == 0)
    .map(v => v * 2)
    .reduce((sum, v) => v + sum, 1)
    .value();

### Piping

*Note: probably easier to use the chaining method, unless you have custom functions you want to use*

Using the piping functions.

    fn.open({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6
    })
    .pipe(fn.filter, (v) => v % 2 == 0)
    .pipe(fn.map, (v) => v * 2)
    .pipe(fn.reduce, (sum, v) => v + sum, 1)
    .close();

### Casting (not recommended for most scenarios)

Only use this if you're certain you need it.

Casting to a collection object.

    fn({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6
    })
    .filter(v => v % 2 == 0)
    .map(v => v * 2)
    .reduce((sum, v) => v + sum, 1);

## Todo

1. Avoid calling `collect()` where possible, to prevent double-iterating
2. Improve typing for array/object callbacks, to better differentiate return type and callback types
3. Improve typing for piping
4. Re-implement acceptance of arrays in collections
5. Add `array` describe section to all tests, for completeness

## Contact & License Info

Author: Matthew Balmer  
Email: contact@mattbalmer.com  
Twitter: [@mattbalmer](http://twitter.com/mattbalmer)  
Website: [http://mattbalmer.com](http://mattbalmer.com)  
License: MIT

import * as collectionUtils from './utils/collections';
import * as functions from './functions';
import * as pipes from './pipe';
import { collection } from './collection';
import { chain } from './chain';
import { TodoAny } from '@source/types';

function fn(_collection: TodoAny) {
  return collection(_collection);
}
fn.collection = collection;

fn.collect = collectionUtils.collect;
fn.chain = chain;

fn.open = pipes.open;
// fn.pipe = pipes.pipe;
// fn.close = pipes.close;

fn.forEach = functions.forEach;
fn.find = functions.find;
fn.findKey = functions.findKey;
fn.some = functions.some;
fn.every = functions.every;
fn.sort = functions.sort;
fn.filter = functions.filter;
fn.map = functions.map;
fn.mapKeys = functions.mapKeys;
fn.reduce = functions.reduce;
fn.reduceRight = functions.reduceRight;

export default fn;
if(typeof window !== 'undefined') {
  // @ts-ignore
  window['fn'] = fn;
}
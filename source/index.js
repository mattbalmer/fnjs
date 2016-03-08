import * as utils from './utils';
import * as functions from './functions';
import * as pipes from './pipe';
import { collection } from './collection';
import { chain } from './chain';

function fn(_collection) {
    return collection(_collection);
}
fn.collection = collection;

fn.collect = utils.collect;
fn.chain = chain;

fn.open = pipes.open;
fn.pipe = pipes.pipe;
fn.close = pipes.close;

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
if(typeof window !== 'undefined') { window.fn = fn }
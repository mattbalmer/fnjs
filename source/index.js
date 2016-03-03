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

fn.filter = functions.filter;
fn.map = functions.map;
fn.reduce = functions.reduce;

export default fn;
if(typeof window !== 'undefined') { window.fn = fn }
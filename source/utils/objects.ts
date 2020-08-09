import { TodoAny } from '@source/types';

function extend(src: TodoAny, ...objects: TodoAny) {
  for(let i in objects) {
    if(!objects.hasOwnProperty(i)) continue;
    let obj = objects[i];
    for(let key in obj) {
      if(!obj.hasOwnProperty(key)) continue;
      if(obj[key] && typeof obj[key] == 'object' && obj[key].constructor == Object) {
        src[key] = mix({}, obj[key]);
      } else {
        src[key] = obj[key];
      }
    }
  }
  return src;
}

function mix(src: TodoAny, ...objects: TodoAny) {
  let copy = extend({}, src);
  return extend(copy, ...objects);
}

export { extend, mix }
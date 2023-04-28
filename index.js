const clone = require('./lib/clone');

let a = { c: 1 };

let b = clone(a);
a.c = 2;
console.log('a.c', a.c);
console.log('b.c', b.c);

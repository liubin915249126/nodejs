const { inspect } = require('util');

const o1 = {
  b: [2, 3, 1],
  d:{
    a:{
        b:{
            b:'111'
        }
    }
  },
  a: '`a` comes before `b`',
  c: new Set([2, 3, 1])
};
console.log(inspect(o1, { sorted: true,compact: true, depth: 5, breakLength: 80  }));
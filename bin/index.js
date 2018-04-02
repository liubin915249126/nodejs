#!/usr/bin/env node

'use strict';

const program = require('commander');

program
    .version('0.0.1')
    .usage('例子')
    .description('this is a lizi of commander')

program
    .command('hello [st]')
    .action(function(st,value){
        hello(st,value);
    })

function hello(val,o){
    console.log(val);
    console.log(1);
    console.log(o)
}

program
    .option('-f --flag [value]','保存','ha')
    .option('-t --tale [value]','保存')

program.parse(process.argv);

if (program.flag){
    global.flag = program.flag;
}

console.log(global.flag);
console.log("liubin");
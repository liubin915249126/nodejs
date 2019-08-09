#!/usr/bin/env node
var inquirer = require( 'inquirer' );
var program = require('commander');
const simpleGit = require('simple-git')();
program
    .command( 'list' ) //声明hi下有一个命令叫list
    .description( 'list files in current working directory' ) //给出list这个命令的描述
    .option( '-a, --all', 'Whether to display hidden files' ) //设置list这个命令的参数
    .action( function ( options ) { //list命令的实现体
        let choices = [ 'aaa', 'bbb', 'ccc', 'dddd' ];
        let questions = [ {
            type: 'list',
            name: 'repo',
            message: 'which repo do you want to install?',
            choices
        } ];
        // 调用问题
        inquirer.prompt( questions )
            .then( answers => {
                console.log( answers ); // 输出最终的答案
                try {
                    simpleGit.clone('https://github.com/liubin915249126/react-study.git')
                } catch (error) {
                    console.log(error)
                }
            } )
    } );
program.parse(process.argv);    
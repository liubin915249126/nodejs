#!/usr/bin/env node
var program = require('commander');
program
    .command( 'list' ) //声明hi下有一个命令叫list
    .description( 'list files in current working directory' ) //给出list这个命令的描述
    .option( '-a, --all', 'Whether to display hidden files' ) //设置list这个命令的参数
    .action( function ( options ) { //list命令的实现体
        var fs = require( 'fs' );
        //获取当前运行目录下的文件信息
        fs.readdir( process.cwd(), function ( err, files ) {
            var list = files;
            if ( !options.all ) { //检查用户是否给了--all或者-a的参数，如果没有，则过滤掉那些以.开头的文件
                list = files.filter( function ( file ) {
                    return file.indexOf( '.' ) !== 0;
                } );
            }
            console.log(process.cwd(),err)
            console.log( list.join( '\n\r' ) ); //控制台将所有文件名打印出来
        });
    } );
program.parse(process.argv);    
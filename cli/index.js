// babel解析
require( "babel-register" )
require( "babel-core" )
    .transform( "code", {
        presets: [ [ require('babel-preset-latest-node').default, {
            target: 'current'
        } ] ]
    } );
require( 'babel-polyfill' )

require('./src')
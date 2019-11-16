const path = require('path'); 
const config = {
    entry:path.resolve(__dirname,'generator/async.js'),
    output: {
        publicPath:'',
        path: path.resolve(__dirname, 'generator/dist'),
        filename: 'js/[name].[hash].bundle.js',
    },
    target: 'node',
}
module.exports = config;
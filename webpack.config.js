// var webpack = require("webpack");
// var path = require('path');
//
// var config = {
//          entry:[
//              'webpack/hot/dev-server',
//              'webpack-dev-server/client?http://localhost:7070', //增加的入口点使文件改变时浏览器自动刷新当然你也可以直接在你 index.html 引入这部分代码:<script src="http://localhost:7070/webpack-dev-server.js"></script>
//              path.resolve(__dirname,'src/js/entry.js')
//          ],
//          output:{
//              path: path.resolve(__dirname, 'build'),
//                  publicPath:'../',
//                  filename: 'js/bundle.[chunkhash:8].js',
//                  chunkFilename:"js/[name].[chunkhash:8].js"
//          },
//      module:{
//              loaders:[
//                      {//js、jsx
//                              test: /\.jsx?$/,
//                          exclude:/node_modules/,//排除node_modules中的库文件，加快编译速度
//                          loader: 'babel',
//                          query:{
//                              presets:['es2015', 'react']
//                          }
//                  },
//                  {//css
//                          test: /\.css$/,
//                              loader: ExtractTextPlugin.extract("style", "css")//多个加载器通过!链接,可忽略加载器后缀“-loader”
//                      },
//                  {//sass,还需要安装node-sass
//                          test: /\.scss$/,
//                              loader: 'style!css!sass'
//                      },
//
//                  {//less,还需要安装less
//                          test: /\.less$/,
//                              loader: 'style!css!less'
//                      },
//                  {//url-loader:图片、字体图标加载器，是对file-loader的上层封装,支持base64编码。传入的size（也有的写limit) 参数是告诉它图片如果不大于 25KB 的话要自动在它从属的 css 文件中转成 BASE64 字符串.
//                          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
//                              loader: 'url?limit=25000&name=[name].[ext]'
//                      }
//              ]
//          },
//  };
//
//  module.exports = config;


module.exports = {
    entry: '../js/entry.js',//入口文件
    output: {//输出文件
        filename: 'index.js',//输出文件名
        path: __dirname + '/out'//输出文件路径
    },
    module: {
        rules: [
            {test: /.js$/, use: ['babel-loader']},
            {test: /.css$/, use: ['style-loader', 'css-loader']},/*解析css, 并把css添加到html的style标签里*/
            //{test: /.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader',use: 'css-loader'})},/*解析css, 并把css变成文件通过link标签引入*/
            {test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=8192&name=./[name].[ext]']},/*解析图片*/
            {test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']}/*解析less, 把less解析成浏览器可以识别的css语言*/
        ]
    },
}


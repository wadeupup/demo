const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['vue']
  },
  output: {
    path: path.join(__dirname, '../src/'),//打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library'
    //这里需要和webpack。DllPlugin中的'[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '[name]-mainfest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}
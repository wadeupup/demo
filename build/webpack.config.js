// const path = require('path')
// module.exports = {
//   mode: 'development',
//   entry: path.resolve(_dirname, '../src/main.js'),
//   output: {
//     filename: 'output.js',
//     path: path.resolve(_dirname, '../dist')
//   }
// }
// webpack.config.js
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// module.exports = {
//   mode: 'development', // 开发模式
//   entry: path.resolve(__dirname, '../src/main.js'),    // 入口文件
//   output: {
//     filename: '[name].[hash:8].js',      // 打包后的文件名称
//     path: path.resolve(__dirname, '../dist')  // 打包后的目录
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, '../public/index.html')
//     })
//   ]
// }

// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// module.exports = {
//   mode: 'development',
//   entry: path.resolve(_dirname, '../src/main.js'),
//   output: {
//     filename: '[name].[hash:8].js',
//     path: path.resolve(_dirname, '../dist')
//   },
//   target: 'node',
//   node: {
//     console: true,
//     global: true,
//     process: true,
//     Buffer: true,
//     __filename: true,
//     __dirname: true,
//     setImmediate: true,
//     fs: 'empty'

//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(_dirname, '../public/index.html')
//     })
//   ]
// }
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const devMode = process.argv.indexOf('--mode=development') !== -1;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
console.log(happyThreadPool, os.cpus(), 'dddd')
console.log(process.argv, 1111111111, devMode)
module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    // header: path.resolve(__dirname, '../src/header.js'),
    // polyfill: "@babel/polyfill"
  },
  output: {
    filename: '[name].[hash:8].js',
    // filename: '[id].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../public/header.html'),
    //   filename: 'header.html',
    //   chunks: ['header']
    // }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: devMode ? '[name].css' : '[name].[hash].css',
    //   chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    // }),
    new MiniCssExtractPlugin({
      filename: devMode ? "css/[name].css" : "css/[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    new vueLoaderPlugin(),
    new HappyPack({
      id: 'babel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }],
      threadPool: happyThreadPool
    }),
    // new HappyPack({
    //   id: 'css',
    //   loaders: ['vue-style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
    //   threadPool: happyThreadPool
    // }),
    new HappyPack({
      id: 'vue',
      loaders: ['vue-loader'],
      threadPool: happyThreadPool
    }),
    new AddAssetHtmlPlugin(//自动写入vendor.dll.js
      [
        {
          filepath: require.resolve(path.join(__dirname, "./static/js/vendor.dll.js")), //将生成的dll文件加入到index.html中
        },
      ]
    ),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, 'vendor-mainfest.json')
    }),
    // new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
    //   { from: 'static', to: 'static' }
    // ])
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   mainfest: require('./vendor-mainfest.json')
    // }), new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
    //   { from: 'static', to: 'static' }
    // ])
    // new Webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['happypack/loader?id=css']
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          // options: {
          //   publicPath: "../dist/css/",
          //   // hmr: devMode
          // }
        }, 'css-loader']
        // use: ['vue-style-loader', 'css-loader']
        // use: ['vue-style-loader', 'css-loader']
        // use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        // use: ['happypack/loader?id=css']
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          // options: {
          //   publicPath: "../dist/css/",
          //   // hmr: devMode
          // }
        }, 'css-loader', 'less-loader', 'postcss-loader']
        // use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      // {
      //   test: /\.js$/,
      //   use: [{
      //     loader: path.resolve(__dirname, '../loader/drop-console.js')
      //   }]
      //   // use: path.resolve(__dirname, './drop-console.js')
      // },
      {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, '../loader/drop-console.js'),
          options: {
            name: 'YOLO'
          }
        },
      },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            // compilerOptions: {
            //   preserveWhitespace: false
            // },
            extractCSS: true
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      ' @': path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.json', '.vue']
  }
  // devServer: {
  //   port: 3000,
  //   hot: true,
  //   contentBase: '../dist'
  // },
}
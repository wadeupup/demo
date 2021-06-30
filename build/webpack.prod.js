
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const firstPlugin = require('./webpack-firstPlugin.js')
// const ParallelauglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = WebpackMerge.merge(webpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist')
      }]
    }),
    // new BundleAnalyzerPlugin({
    //   analyerHost: '127.0.0.1',
    //   analyzerPort: 8899
    // }),
    new firstPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({//压缩js
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({}),
      // new ParallelauglifyPlugin({
      //   cacheDir: './cache',
      //   uglifyJS: {
      //     output: {
      //       comments: false,
      //       beautify: false
      //     },
      //     compress: {
      //       drop_console: true,
      //       collapse_vars: true,
      //       reduce_vars: true
      //     }
      //   }
      // })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    },
  }
})
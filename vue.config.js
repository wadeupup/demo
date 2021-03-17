module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('postcss-advanced-variables'), require('postcss-partial-import'), require('autoprefixer'), require('precss')]
      }
    }
  },
}


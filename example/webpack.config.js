const path = require('path');

module.exports = [{
  mode: 'development',
  context: path.resolve('src'),
  entry: './index.hbs',
  module: {
    rules: [{
      test: /\.(hbs)/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[name].html",
          emitFile: true
        }
      }, {
        loader: 'anyengine-loader',
        options: {
          data: 'data',
          use: [ 'frontmatter' ]
        }
      }]
    }]
  },
  devServer: {
    index: 'index.html',
    port: 9191,
    open: true
  },
  resolveLoader: {
    alias: {
      "anyengine-loader": path.join(__dirname, '..')
    }
  }
}];

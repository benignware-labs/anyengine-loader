const path = require('path');
const { sync: glob } = require('glob');
const webpack = require('webpack');

module.exports = [{
  mode: 'development',

  context: path.join(__dirname, 'src'),

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

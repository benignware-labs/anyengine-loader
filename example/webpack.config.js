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
        loader: 'anygine-loader',
        options: {
          data: 'data',
          runtime: 'handlebars',
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
      "anygine-loader": path.join(__dirname, '..')
    }
  }
}];

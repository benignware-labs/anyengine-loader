# anyengine-loader

[Anyengine](https://github.com/benignware-labs/anyengine) webpack loader

## Example

Please have a look at the following example using `Handlebars`.

```js
// webpack.config.js
const path = require('path');

module.exports = [{
  mode: 'development',
  context: path.resolve('src'),
  entry: './index.hbs',
  module: {
    rules: [{
      test: /\.(hbs|handlebars)/,
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
  }
}];
```

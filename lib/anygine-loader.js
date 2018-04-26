const path = require('path');
const { getOptions, stringifyRequest } = require('loader-utils');
const { promisify } = require('util');
const globAsync = promisify(require('glob'));
const { sync: isBinaryFile } = require("isbinaryfile");
const extName = require('ext-name');

const Anygine = require('anygine');

module.exports = function(source) {
  const { context, addDependency, async, resourcePath } = this;
  const { runtime, use = [], data, basedir = context, ...options } = getOptions(this);
  const callback = async();

  this.cacheable();

  // Find any templates contained in basedir
  globAsync('**/*.*', {
    ignore: ['node_modules/**/*.*'],
    cwd: basedir,
    absolute: true
  }).then(files => {
    files.filter(src => {
      let [ { mime } = {} ] = extName(src);

      return (/^\s*text/.test(mime) || !isBinaryFile(src));
    }).forEach(src => {
      addDependency(src);
    });
  })

  // Configure...
  Anygine.runtime = runtime;

  for (let plugin of use) {
    Anygine.use(use);
  }

  // Render...
  source = Anygine.render(source, data, {
    filename: resourcePath,
    basedir,
    ...options
  });

  callback(null, source);

  return source;
}

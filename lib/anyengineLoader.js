const path = require('path');
const { getOptions, stringifyRequest } = require('loader-utils');
const { promisify } = require('util');
const globAsync = promisify(require('glob'));
const { sync: isBinaryFile } = require("isbinaryfile");
const extName = require('ext-name');

const Engine = require('anyengine');

module.exports = function(source) {
  const { context, addDependency, async, resourcePath } = this;
  const { basedir = context, ...options } = getOptions(this);
  const callback = async();

  this.cacheable();

  console.log('DO IT...');

  // Find any templates contained in basedir
  globAsync('**/*.*', {
    ignore: ['node_modules/**/*.*'],
    cwd: basedir,
    absolute: true
  }).then(files => {
    files.filter(src => {
      let [ { mime } = {} ] = extName(src);

      return (/^\s*text/.test(mime) || !isBinaryFile(src));
    }).forEach(src => addDependency(src));
  })

  // Configure...
  Engine.configure({ basedir, ...options });

  // Render...
  source = Engine.render(source, {}, { filename: resourcePath });

  callback(null, source);

  return source;
}

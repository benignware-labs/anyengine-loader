const { getOptions } = require('loader-utils');
const { promisify } = require('util');
const globAsync = promisify(require('glob'));
const { sync: isBinaryFile } = require('isbinaryfile');
const extName = require('ext-name');

const Engine = require('anyengine');

module.exports = function anyengineLoader(source) {
  const { cacheable, context, addDependency, async, resourcePath } = this;
  const { basedir = context, ...options } = getOptions(this);
  const callback = async();

  // Find any text files contained in basedir
  globAsync('**/*.*', {
    ignore: ['node_modules/**/*.*'],
    cwd: context,
    absolute: true,
  }).then(files => {
    files.filter(src => {
      const [ { mime } = {} ] = extName(src);

      return (/^\s*text/.test(mime) || !isBinaryFile(src));
    }).forEach(src => addDependency(src));
  }).then(() => {
    cacheable();

    // Configure...
    Engine.configure({ basedir, ...options });

    // Render...
    source = Engine.render(source, {}, { filename: resourcePath });

    callback(null, source);
  }).catch(error => {
    callback(error, null);
  });

};

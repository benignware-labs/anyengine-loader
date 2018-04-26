const assert = require('assert');
const fs = require('fs');
const path = require('path');
const pretty = require('pretty');
const anygineLoader = require('..');
const Handlebars = require('handlebars');
const frontmatter = require('frontmatter');

const readFileSync = (file, prettify = false) => {
  const source = fs.readFileSync(file, 'utf-8');

  return prettify ? pretty(source, {
    ocd: true
  }) : source;
};

describe('anygine-loader', () => {
  const createContext = (resourcePath, options = {}, callback) => ({
    context: 'fixtures',
    query: {
      runtime: Handlebars,
      ...options
    },
    resourcePath,
    cacheable: () => {},
    addDependency: () => {},
    async: () => callback
  });

  it('renders basic template', (done) => {
    const expected = readFileSync('expected/basic.html', true);
    const source = readFileSync('fixtures/basic.hbs');
    const context = createContext('fixtures/basic.hbs', {
      data: {
        title: 'Foo'
      }
    }, (err, actual) => {
      assert.equal(actual, expected);
      done();
    });

    anygineLoader.call(context, source);
  });

  it('renders advanced template', (done) => {
    const expected = readFileSync('expected/advanced.html', true);
    const source = readFileSync('fixtures/advanced.hbs');
    const context = createContext('fixtures/advanced.hbs', {
      data: path.join(__dirname, 'fixtures', 'data')
    }, (err, actual) => {
      assert.equal(actual, expected);
      done();
    });

    anygineLoader.call(context, source);
  });

  it('renders template with middleware', (done) => {
    const expected = readFileSync('expected/middleware.html', true);
    const source = readFileSync('fixtures/middleware.hbs');
    const context = createContext('fixtures/middleware.hbs', {
      use: [ frontmatter ],
      data: path.join(__dirname, 'fixtures', 'data')
    }, (err, actual) => {
      assert.equal(actual, expected);
      done();
    });

    anygineLoader.call(context, source);
  });
});

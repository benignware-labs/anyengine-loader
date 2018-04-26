const assert = require('assert');
const { readFileSync } = require('fs');
const pretty = require('pretty');
const anygineLoader = require('..');
const Handlebars = require('handlebars');

describe('anygine-loader', () => {
  const resourcePath = 'fixtures/test.hbs';
  const createContext = (options = {}, callback) => ({
    context: 'fixtures',
    query: options,
    resourcePath,
    cacheable: () => {},
    addDependency: () => {},
    async: () => callback
  });

  let expected;
  let source;

  beforeEach(() => {
    source = readFileSync(resourcePath, 'utf-8');
    expected = pretty(readFileSync('expected/test.html', 'utf-8'), {
      ocd: true
    });
  });

  it('renders the template', (done) => {
    const actual = anygineLoader.call(createContext({
      runtime: Handlebars,
      data: {
        title: 'Foo'
      }
    }, (err, actual) => {
      assert.equal(actual, expected);
      done();
    }), source);
  });
});

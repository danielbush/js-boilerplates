const { default: register } = require('ignore-styles');
require('babel-polyfill');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const enzyme = require('enzyme');
const chaiEnzyme = require('chai-enzyme');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiEnzyme);
const expect = chai.expect;
const sandbox = sinon.sandbox.create();

global.chai = chai;
global.expect = expect;
global.sinon = sinon;
global.sandbox = sandbox;
global.enzyme = enzyme;
global.fakeStyles = {}; // ignore-styles 'register'

// style-loader requires a real dom.
// http://airbnb.io/enzyme/docs/guides/jsdom.html
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

register([ '.css', '.sass', '.scss' ], (module, filename) => (module.exports = global.fakeStyles ));

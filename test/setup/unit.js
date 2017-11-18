const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);
chai.use(sinonChai);
const expect = chai.expect;
const sandbox = sinon.sandbox.create();

global.chai = chai;
global.expect = expect;
global.sinon = sinon;
global.sandbox = sandbox;

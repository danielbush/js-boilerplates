const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const enzyme = require('enzyme');
const chaiEnzyme = require('chai-enzyme');

chai.use(sinonChai);
chai.use(chaiEnzyme);
const expect = chai.expect;
const sandbox = sinon.sandbox.create();

global.chai = chai;
global.expect = expect;
global.sinon = sinon;
global.sandbox = sandbox;
global.enzyme = enzyme;

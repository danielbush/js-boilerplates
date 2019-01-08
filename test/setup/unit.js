const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiAsPromised);
const expect = chai.expect;
const sandbox = sinon.createSandbox();

global.chai = chai;
global.expect = expect;
global.sinon = sinon;
global.sandbox = sandbox;

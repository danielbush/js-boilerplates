import sinon from 'sinon';
import { expect } from 'chai';
import func from './boilerplate';

const sandbox = sinon.createSandbox();

describe('boilerplate', () => {
  let stub: sinon.SinonStub<any[], any>;

  beforeEach(() => {
    stub = sandbox.stub();
  });
  afterEach(() => sandbox.reset());
  after(() => sandbox.restore());

  it('should do basic example (boilerplate)', () => {
    stub.callsFake(() => 123);
    const answer = stub(2);
    expect(answer).to.equal(123);
    expect(stub).to.have.been.calledWith(2);
  });
});

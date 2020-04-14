import sinon from 'sinon';
import { expect } from 'chai';
import func from './boilerplate';

const sandbox = sinon.createSandbox();

describe('boilerplate', () => {
  const stub: sinon.SinonStub<[number], number> = sandbox.stub();

  beforeEach(() => {
    sandbox.reset();
  });
  after(() => sandbox.restore());

  it('should do basic example (boilerplate)', () => {
    stub.callsFake((a: number) => 123);
    const answer = stub(2);
    expect(answer).to.equal(123);
    expect(stub).to.have.been.calledWith(2);
  });
});

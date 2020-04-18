// Importing this so we see coverage stats from nyc:
import './boilerplate';

describe('boilerplate', () => {
  const stub = sandbox.stub();

  beforeEach(() => {
    sandbox.reset();
  });
  after(() => sandbox.restore());

  it('should do basic example (boilerplate)', async () => {
    stub.callsFake(() => 123);
    const answer = stub(2);
    expect(answer).to.equal(123);
    expect(stub).to.have.been.calledWith(2);
  });

  it('should run async (may require babel-polyfill for regenerator-runtime)', async () => {
    stub.resolves(123);
    const answer = await stub(2);
    expect(answer).to.equal(123);
    expect(stub).to.have.been.calledWith(2);
  });
});

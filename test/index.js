import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const expect = chai.expect;
const sandbox = sinon.sandbox.create();

describe('something', () => {

  let stub;

  beforeEach(() => {
    stub = sandbox.stub();
  })
  afterEach(() => sandbox.reset());
  after(() => sandbox.restore());

  it('should do something', () => {
    stub.callsFake(() => 123)
    const answer = stub(2);
    expect(answer).to.equal(123);
    expect(stub).to.have.been.calledWith(2);
  })

});

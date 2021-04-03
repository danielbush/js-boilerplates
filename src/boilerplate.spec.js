const func = require('./boilerplate');

test('true', () => {
  expect(true).toBe(true);
});

/*
describe('boilerplate', () => {
  const stub = sandbox.stub();

  beforeEach(() => {
    sandbox.reset();
  });
  after(() => sandbox.restore());

  it('should do basic example (boilerplate)', () => {
    stub.callsFake(() => 123);

    const answer = stub(2);
    func();

    expect(answer).to.equal(123);
    expect(stub).to.have.been.calledWith(2);
  });
});
*/

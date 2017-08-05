import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(sinonChai);
chai.use(chaiEnzyme);
const expect = chai.expect;
const sandbox = sinon.sandbox.create();

describe('boilerplate', () => {

  let stub;

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

  it('should shallow mount div', () => {
    const Component = () => (<div />)
    const wrapper = shallow(<Component/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

});

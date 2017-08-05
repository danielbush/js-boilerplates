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

  it('should shallow mount div', () => {
    const Component = () => (<div />);
    const wrapper = shallow(<Component />);
    expect(wrapper.find('div')).to.have.length(1);
  });

});

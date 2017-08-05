import React from 'react';

const shallow = enzyme.shallow;

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

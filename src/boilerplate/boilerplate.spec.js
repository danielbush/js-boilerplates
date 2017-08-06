import React from 'react';

import HelloWorld from '../../src/boilerplate/boilerplate';

const shallow = enzyme.shallow;

describe('boilerplate', () => {

  global.fakeStyles.grey = '#hey!';

  let stub;

  beforeEach(() => {
    stub = sandbox.stub();
  });
  afterEach(() => sandbox.reset());
  after(() => sandbox.restore());

  it('should shallow mount div', () => {
    const wrapper = shallow(<HelloWorld name="foo" />);
    expect(wrapper.find('div')).to.have.length(3);
  });

});

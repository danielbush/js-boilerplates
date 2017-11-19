import React from 'react';

import App from './app';

const shallow = enzyme.shallow;

describe('routes', () => {

  it('should have a switch', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Switch')).to.have.length(1);
  });

  it('should include a main route', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Route[path="/"]')).to.have.length(1);
  });

});

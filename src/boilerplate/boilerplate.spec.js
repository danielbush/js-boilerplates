import React from 'react';

import App from './boilerplate';

const shallow = enzyme.shallow;

describe('boilerplate', () => {

  it('should shallow mount div', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Switch')).to.have.length(1);
  });

});

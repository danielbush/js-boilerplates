import React from 'react';
import HelloWorld from './hello-js-func';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('boilerplate', () => {
  it('should shallow mount div', async () => {
    render(<HelloWorld name="foo" />);

    expect(await screen.findAllByText((el) => el.trim())).toHaveLength(3);
  });
});

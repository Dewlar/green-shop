import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

describe('App component', () => {
  test('renders app component', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/React works!!!/i);
    expect(linkElement).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import App, { testFunction } from './app';

describe('App component', () => {
  test('renders app component', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/React works!!!/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('testFunction', () => {
  test('adds 1 to the input number', () => {
    expect(testFunction(2)).toBe(3);
  });
});

import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './components/app/app';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

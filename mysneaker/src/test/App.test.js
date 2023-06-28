import { render, screen } from '@testing-library/react';
import App from '../App';

test('Check Main Page', () => {
  render(<App />);
  const linkElement = screen.getByTitle(/MySneaker/i);
  expect(linkElement).toBeInTheDocument();
});

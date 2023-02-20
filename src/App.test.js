import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  let comp = render(<App />);
  const linkElement = comp.getByText(/Not Found/i);
  expect(linkElement).toBeTruthy();
});



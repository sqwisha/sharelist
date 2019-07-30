import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import App from './App';

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

test('it should render without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

test('it should render Header and List', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(getByText('ShareList')).toBeInTheDocument();
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Sign Up')).toBeInTheDocument();
  expect(getByText('Sign In')).toBeInTheDocument();
  expect(getByText('Add')).toBeInTheDocument();
  expect(getByText('List')).toBeInTheDocument();
});

test('it should navigate to all navbar links', () => {
  const { container, getByText, getByPlaceholderText } = renderWithRouter(
    <App />
  );
  expect(container.innerHTML).toContain('List');
  const leftClick = { button: 0 };

  fireEvent.click(getByText(/home/i), leftClick);
  expect(container.innerHTML).toContain('List');

  fireEvent.click(getByText(/sign up/i), leftClick);
  expect(getByPlaceholderText(/enter password again/i)).toBeInTheDocument();

  fireEvent.click(getByText(/sign in/i), leftClick);
  expect(getByPlaceholderText(/enter password/i)).toBeInTheDocument();
});

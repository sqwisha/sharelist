import React from 'react';
import SignIn from './SignIn';

import { render, cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

test('it should render without crashing', () => {
  const { getByLabelText, getByTestId } = render(<SignIn />);

  expect(getByLabelText(/email/i)).toBeInTheDocument();
  expect(getByLabelText(/password/i)).toBeInTheDocument();
  expect(getByTestId('sign-in-button')).toBeInTheDocument();
});

test('it should allow sign-in', () => {
  const signIn = jest.fn();
  const { getByLabelText, getByTestId } = render(<SignIn signIn={signIn} />);

  const email = getByLabelText(/email/i);
  const password = getByLabelText(/password/i);
  const signInBtn = getByTestId('sign-in-button');

  fireEvent.change(email, { target: { value: 'an@email.com' } });
  expect(email.value).toBe('an@email.com');
  fireEvent.change(password, { target: { value: `''''''` } });
  expect(password.value).toBe(`''''''`);
  fireEvent.click(signInBtn);
  expect(signIn).toHaveBeenCalledTimes(1);
});

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import SignUp from './SignUp';

afterEach(cleanup);

test('it should render without crashing', () => {
  const { getByLabelText, getByTestId } = render(<SignUp />);

  expect(getByLabelText(/email/i)).toBeInTheDocument();
  expect(getByLabelText(/password confirmation/i)).toBeInTheDocument();
  expect(getByTestId('sign-up-button')).toBeInTheDocument();
});

test('it should allow sign-up', () => {
  const signUp = jest.fn();
  const { getByLabelText, getByTestId } = render(<SignUp signUp={signUp} />);

  const email = getByLabelText(/email/i);
  const password = getByLabelText('Password');
  const passwordConf = getByLabelText('Password Confirmation');
  const signUpBtn = getByTestId('sign-up-button');

  fireEvent.change(email, { target: { value: 'new@user.com' } });
  fireEvent.change(password, { target: { value: '000000' } });
  fireEvent.change(passwordConf, { target: { value: '000000' } });

  expect(email.value).toBe('new@user.com');
  expect(password.value).toBe('000000');
  expect(passwordConf.value).toBe('000000');

  fireEvent.click(signUpBtn);
  expect(signUp).toHaveBeenCalledTimes(1);
});

test('it should display error message when passwords do not match', () => {
  const { getByLabelText, getByTestId, getByText, queryByText } = render(
    <SignUp />
  );

  const email = getByLabelText(/email/i);
  const password = getByLabelText('Password');
  const passwordConf = getByLabelText('Password Confirmation');
  const signUpBtn = getByTestId('sign-up-button');

  expect(
    queryByText(/password and confirmation must match/i)
  ).not.toBeInTheDocument();

  fireEvent.change(email, { target: { value: 'new@user.com' } });
  fireEvent.change(password, { target: { value: '000000' } });
  fireEvent.change(passwordConf, { target: { value: '111111' } });

  expect(email.value).toBe('new@user.com');
  expect(password.value).toBe('000000');
  expect(passwordConf.value).toBe('111111');

  fireEvent.click(signUpBtn);

  expect(
    getByText(/password and confirmation must match/i)
  ).toBeInTheDocument();
});

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import NewItemForm from './NewItemForm';

afterEach(cleanup);

test('it should render without crashing', () => {
  const { getByLabelText } = render(<NewItemForm />);

  expect(getByLabelText(/new item/i)).toBeInTheDocument();
});

test('it should add new list item', () => {
  const handleNewListItem = jest.fn();
  const { getByLabelText, getByTestId } = render(
    <NewItemForm handleNewListItem={handleNewListItem} />
  );

  const newItemInput = getByLabelText(/new item/i);

  fireEvent.change(newItemInput, { target: { value: 'Watermelons' } });
  expect(newItemInput.value).toBe('Watermelons');

  fireEvent.submit(getByTestId('new-item-form'));
  // Below is more true to life (and passes), but logs a JSDOM
  // "Not Implemented" message.

  // fireEvent.click(getByTestId('add-button'));
  expect(handleNewListItem).toHaveBeenCalledTimes(1);
});

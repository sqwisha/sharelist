import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { StateMock } from '@react-mock/state';
import faker from 'faker';

import List from './List';

afterEach(cleanup);

const listItems = [];
for (var i = 0; i < 10; i++) {
  listItems.push({
    key: faker.random.number(),
    id: faker.random.number(),
    userId: 'Guest',
    title: faker.lorem.words(),
    purchased: faker.random.boolean()
  });
}

test('it should load and display new item form', async () => {
  const { getByTestId } = render(<List />);

  expect(getByTestId('new-item-form')).toBeInTheDocument();
});

test('it should load and display title', async () => {
  const { getByTestId } = render(<List />);
  expect(getByTestId('List')).toHaveTextContent('List');
});

test('it should submit new list item', () => {
  const { getByTestId, getByText } = render(<List />);
  const newItemInput = getByTestId('new-item-input');

  fireEvent.change(newItemInput, { target: { value: 'Test Item' } });
  expect(newItemInput.value).toEqual('Test Item');

  fireEvent.click(getByText('Add'));
  expect(newItemInput.value).toBe('');
});

test('it should render list items', () => {
  const { getByText } = render(
    <StateMock state={{ listItems: listItems }}>
      <List user={'Guest'} />
    </StateMock>
  ); // will give uncontrolled component console error

  expect(getByText(listItems[0].title)).toBeInTheDocument();
});

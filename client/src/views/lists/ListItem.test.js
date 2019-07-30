import React from 'react';
import { StateMock } from '@react-mock/state';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from '@testing-library/react';

import ListItem from './ListItem';

afterEach(cleanup);

const item = {
  id: 1,
  key: '0',
  purchased: true,
  title: 'Live long and prosper'
};

const renderComponent = ({ editing }, i, h, d) =>
  render(
    <StateMock state={{ editing }}>
      <ListItem item={i} handleCheckboxChange={h} deleteListItem={d} />
    </StateMock>
  );

test('it should render without crashing', () => {
  const handleCheckboxChange = jest.fn();
  const deleteListItem = jest.fn();
  const { getByTestId } = render(
    <ListItem
      item={item}
      handleCheckboxChange={handleCheckboxChange}
      deleteListItem={deleteListItem}
    />
  );

  expect(getByTestId(item.key)).toBeInTheDocument();
});

test('it should call prop methods when clicked', () => {
  const handleCheckboxChange = jest.fn();
  const deleteListItem = jest.fn();
  const { getByTestId } = render(
    <ListItem
      item={item}
      handleCheckboxChange={handleCheckboxChange}
      deleteListItem={deleteListItem}
    />
  );

  fireEvent.click(getByTestId(item.key)); //checkbox
  expect(handleCheckboxChange).toHaveBeenCalledTimes(1);
  expect(getByTestId(item.key).checked).toBe(true);

  fireEvent.click(getByTestId('delete-button'));
  expect(deleteListItem).toHaveBeenCalledTimes(1);
});

test('it should display text input and cancel-edit button when state = {editing: true}', async () => {
  const handleCheckboxChange = jest.fn();
  const deleteListItem = jest.fn();
  const { getByTestId } = renderComponent(
    { editing: true },
    item,
    handleCheckboxChange,
    deleteListItem
  );
  await waitForElement(() => getByTestId('edit-input'));
  expect(getByTestId('cancel-edit-button')).toBeInTheDocument();
});

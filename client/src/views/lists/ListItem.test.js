import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem';

const item = {
  id: 1,
  key: '0',
  purchased: true,
  title: 'quidem molestiae enim'
};
const handleCheckboxChange = function() {};
const deleteListItem = function() {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ListItem
      item={item}
      handleCheckboxChange={handleCheckboxChange}
      deleteListItem={deleteListItem}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

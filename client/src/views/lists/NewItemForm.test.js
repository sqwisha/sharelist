import React from 'react';
import ReactDOM from 'react-dom';
import NewItemForm from './NewItemForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewItemForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

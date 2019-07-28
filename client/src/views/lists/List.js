import React, { Component } from 'react';
import firebase from '../../Firebase';

import './List.css';

import NewItemForm from './NewItemForm';
import ListItem from './ListItem';

class List extends Component {
  constructor() {
    super();
    this.state = {
      listItems: [],
      newItemInput: ''
    };

    this.listItemsRef = firebase.database().ref('listItems');
  }

  componentDidMount() {
    this.listItemsRef.on('value', (snapshot) => {
      let listItems = [];
      const items = snapshot.val();

      for (let item in items) {
        listItems.push({
          key: item,
          id: items[item].id,
          title: items[item].title,
          purchased: items[item].purchased
        });
      }
      this.setState({ listItems: listItems });
    });
  }

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({ newItemInput: e.target.value });
  };

  handleNewListItem = (e) => {
    e.preventDefault();
    const body = { newListItem: this.state.newItemInput };

    fetch('/api/list_items/add', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('post fetch successful');
      });

    this.setState({ newItemInput: '' });
  };

  handleCheckboxChange = (key, purchased) => {
    this.listItemsRef.child(key).update({ purchased: !purchased });
  };

  deleteListItem = (key) => {
    this.listItemsRef.child(key).remove();
  };

  handleEdit = (key, title) => {
    const newItemTitle = prompt('Edit item: ', title);
    if (!newItemTitle) return;

    const updatedTitle = {
      title: newItemTitle
    };

    this.listItemsRef.child(key).update(updatedTitle);
  };

  render() {
    return (
      <div>
        <NewItemForm
          onInputChange={this.onInputChange}
          newItemInput={this.state.newItemInput}
          handleNewListItem={this.handleNewListItem}
        />
        <h2>List</h2>
        <ul>
          {this.state.listItems.map((item) => (
            <ListItem
              key={item.key}
              item={item}
              handleCheckboxChange={this.handleCheckboxChange}
              deleteListItem={this.deleteListItem}
              handleEdit={this.handleEdit}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
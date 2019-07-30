import React, { Component } from 'react';
import firebase from '../../Firebase';

import './List.css';

import NewItemForm from './NewItemForm';
import ListItem from './ListItem';

class List extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      newItemInput: ''
    };

    this.listItemsRef = firebase.database().ref('listItems');
  }

  componentDidMount() {
    this._isMounted = true;
    this.listItemsRef.on('value', (snapshot) => {
      this.setListItems(snapshot);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setListItems = (snapshot) => {
    let listItems = [];
    const items = snapshot.val();

    for (let item in items) {
      listItems.push({
        key: item,
        id: items[item].id,
        userId: items[item].userId,
        title: items[item].title,
        purchased: items[item].purchased
      });
    }

    if (this._isMounted) {
      this.setState({ listItems: listItems });
    }
  };

  userListItems = () => {
    return this.state.listItems.filter((item) => {
      return this.props.user === item.userId;
    });
  };

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({ newItemInput: e.target.value });
  };

  handleNewListItem = (e) => {
    e.preventDefault();
    const body = {
      newListItem: this.state.newItemInput,
      user: this.props.user
    };

    fetch('/api/list_items/add', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((json) => {});

    this.setState({ newItemInput: '' });
  };

  handleCheckboxChange = (key, purchased) => {
    this.listItemsRef.child(key).update({ purchased: !purchased });
  };

  deleteListItem = (key) => {
    this.listItemsRef.child(key).remove();
  };

  updateListItem = (key, title) => {
    this.listItemsRef.child(key).update({ title: title });
  };

  render() {
    return (
      <div data-testid="List">
        <NewItemForm
          onInputChange={this.onInputChange}
          newItemInput={this.state.newItemInput}
          handleNewListItem={this.handleNewListItem}
        />
        <h2>List</h2>
        <ul>
          {this.userListItems().map((item) => (
            <ListItem
              key={item.key}
              item={item}
              handleCheckboxChange={this.handleCheckboxChange}
              deleteListItem={this.deleteListItem}
              updateListItem={this.updateListItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default List;

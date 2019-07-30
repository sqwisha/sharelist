import React, { Component } from 'react';
import firebase from '../../Firebase';
import styled from 'styled-components';

import './List.css';

import NewItemForm from './NewItemForm';
import ListItem from './ListItem';

const ListContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListH2 = styled.h2`
  color: #1f202d;
  padding: 0.8rem 0;
  margin: 0;
  flex-grow: 2;
  font-family: 'Sarina', 'Noto Sans', sans-serif;
`;

const Small = styled.small`
  padding: 0;
  margin: 0;
`;

const UL = styled.ul`
  width: 100%;
  max-width: 350px;
  list-style: none;
  padding: 30px 0 0 0;
  margin: 0;
`;

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
      <ListContainer data-testid="List">
        <NewItemForm
          onInputChange={this.onInputChange}
          newItemInput={this.state.newItemInput}
          handleNewListItem={this.handleNewListItem}
        />
        <ListH2>
          {this.props.user === 'Guest' ? 'Demo List' : 'Private List'}
        </ListH2>
        {this.props.user === 'Guest' ? (
          <Small>Sign up to make a private list!</Small>
        ) : (
          ''
        )}
        <UL>
          {this.userListItems().map((item) => (
            <ListItem
              key={item.key}
              item={item}
              handleCheckboxChange={this.handleCheckboxChange}
              deleteListItem={this.deleteListItem}
              updateListItem={this.updateListItem}
            />
          ))}
        </UL>
      </ListContainer>
    );
  }
}

export default List;

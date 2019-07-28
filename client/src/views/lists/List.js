import React, { Component } from 'react';
import './List.css';
import NewItemForm from './NewItemForm';
import ListItem from './ListItem';

import * as firebase from 'firebase/app';
import 'firebase/database';
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API,
  authDomain: 'sharelist-f0e76.firebaseapp.com',
  databaseURL: 'https://sharelist-f0e76.firebaseio.com',
  projectId: 'sharelist-f0e76',
  storageBucket: '',
  messagingSenderId: '714915154334',
  appId: '1:714915154334:web:4edd3c1a6193abaf'
});

const database = firebase.database();
const listItemsRef = database.ref('listItems');

class List extends Component {
  constructor() {
    super();
    this.state = {
      listItems: [],
      newItemInput: ''
    };
  }

  componentDidMount() {
    listItemsRef.on('value', (snapshot) => {
      let listItems = [];
      for (let item in snapshot.val()) {
        listItems.push(snapshot.val()[item]);
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
            <ListItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default List;

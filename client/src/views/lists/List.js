import React, { Component } from 'react';
import './List.css';
import NewItemForm from './NewItemForm';

class List extends Component {
  constructor() {
    super();
    this.state = {
      listItems: [],
      newItemInput: ''
    };
  }

  componentDidMount() {
    fetch('/api/list_items')
      .then((res) => res.json())
      .then((data) => {
        let listItems = [];
        for (let item in data) {
          listItems.push(data[item]);
        }
        this.setState({ listItems: listItems });
      });
  }

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({ newItemInput: e.target.value });
  };

  render() {
    return (
      <div>
        <NewItemForm
          onInputChange={this.onInputChange}
          newItemInput={this.state.newItemInput}
        />
        <h2>List</h2>
        <ul>
          {this.state.listItems.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;

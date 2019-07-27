import React, { Component } from 'react';
import './List.css';

class List extends Component {
  constructor() {
    super();
    this.state = {
      listItems: []
    }
  }

  componentDidMount() {
    fetch('/api/list_items')
    .then((res) => res.json())
    .then((listItems) => {
      this.setState({listItems}, console.log('List Items', listItems));
    });
  }

  render() {
    return (
      <div>
        <h2>List</h2>
        <ul>
          { this.state.listItems.map(item =>
            <li key={ item.key }>{ item.title }</li>
          )}
        </ul>
      </div>
    );
  }
}

export default List;

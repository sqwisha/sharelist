import React, { Component } from 'react';

export default class NewItemForm extends Component {
  render() {
    return (
      <div className="new-item-form">
        <form onSubmit={this.props.handleNewListItem}>
          <input
            type="text"
            name="newListItem"
            placeholder="Enter new list item"
            onChange={this.props.onInputChange}
            value={this.props.newItemInput}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

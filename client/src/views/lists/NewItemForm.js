import React, { Component } from 'react';

export default class NewItemForm extends Component {
  render() {
    return (
      <>
        <form
          onSubmit={this.props.handleNewListItem}
          className="new-item-form"
          data-testid="new-item-form"
        >
          <label htmlFor="new-item-input">
            New Item
            <input
              id="new-item-input"
              data-testid="new-item-input"
              type="text"
              name="newListItem"
              placeholder="Enter new list item"
              onChange={this.props.onInputChange}
              value={this.props.newItemInput}
            />
          </label>
          <button data-testid="add-button">Add</button>
        </form>
      </>
    );
  }
}

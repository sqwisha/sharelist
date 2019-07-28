import React, { Component } from 'react';

class ListItem extends Component {
  // TODO add state for class/style change on purchased

  render() {
    const { id, key, title, purchased } = this.props.item;

    return (
      <React.Fragment>
        <li>
          <label htmlFor={id}>
            <input
              type="checkbox"
              id={id}
              name="purchased"
              checked={!!purchased}
              onChange={this.props.handleCheckboxChange.bind(
                this,
                key,
                purchased
              )}
            />
            <span>{title}</span>
          </label>
          <button onClick={this.props.deleteListItem.bind(this, key)}>
            &times;
          </button>
          <button onClick={this.props.handleEdit.bind(this, key, title)}>
            Edit
          </button>
        </li>
      </React.Fragment>
    );
  }
}

export default ListItem;

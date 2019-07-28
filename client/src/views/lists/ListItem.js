import React, { Component } from 'react';

class ListItem extends Component {
  // add state for class/style change on purchased
  render() {
    const { id, key, title, purchased } = this.props.item;
    console.log('purchased?', purchased);

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
        </li>
      </React.Fragment>
    );
  }
}

export default ListItem;

import React, { Component } from 'react';

class ListItem extends Component {
  // TODO add state for class/style change on purchased
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editItemInput: ''
    };
  }

  onChange = (e) => {
    const input = e.target.value;

    this.setState({
      editItemInput: input
    });
  };

  toggleEdit = (title) => {
    this.setState({
      editing: !this.state.editing,
      editItemInput: title || ''
    });
  };

  editListItem = (e, key) => {
    e.preventDefault();
    this.props.updateListItem(key, this.state.editItemInput);
    this.setState({
      editing: false,
      editItemInput: ''
    });
  };

  render() {
    const { id, key, title, purchased } = this.props.item;

    return (
      <>
        <li>
          {this.state.editing ? (
            <>
              <form onSubmit={(e) => this.editListItem(e, key)}>
                <input
                  data-testid="edit-input"
                  onChange={this.onChange}
                  type="text"
                  name="editItemInput"
                  defaultValue={title}
                />
                <button>Save</button>
              </form>
              <button
                data-testid="cancel-edit-button"
                onClick={() => this.toggleEdit(title)}
              >
                &times;
              </button>
            </>
          ) : (
            <>
              <label htmlFor={id}>
                <input
                  type="checkbox"
                  id={id}
                  data-testid={key}
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
              <button
                data-testid="edit-button"
                onClick={() => this.toggleEdit(title)}
              >
                Edit
              </button>
              <button
                data-testid="delete-button"
                onClick={this.props.deleteListItem.bind(this, key)}
              >
                &times;
              </button>
            </>
          )}
        </li>
      </>
    );
  }
}

export default ListItem;

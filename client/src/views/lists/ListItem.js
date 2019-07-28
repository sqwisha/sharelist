import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    return (
      <React.Fragment>
        <li>{this.props.item.title}</li>
      </React.Fragment>
    );
  }
}

export default ListItem;

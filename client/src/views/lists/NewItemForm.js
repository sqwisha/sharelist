import React, { Component } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 2px;
  outline-color: #72b6c0;
  padding: 0.5rem;

  ::placeholder {
    text-align: center;
    color: #e68303;
    opacity: 0.7;
  }
`;

const Button = styled.button`
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  outline: none;
  background-color: #2d369d;
  color: #faf9fa;

  :hover {
    background-color: #444daf;
    transition-duration: 150ms;
  }
`;

export default class NewItemForm extends Component {
  render() {
    return (
      <FormContainer>
        <Form
          onSubmit={this.props.handleNewListItem}
          className="new-item-form"
          data-testid="new-item-form"
        >
          <Input
            autoComplete="off"
            id="new-item-input"
            data-testid="new-item-input"
            type="text"
            name="newListItem"
            placeholder="Enter new list item"
            onChange={this.props.onInputChange}
            value={this.props.newItemInput}
          />
          <Button data-testid="add-button">Add</Button>
        </Form>
      </FormContainer>
    );
  }
}

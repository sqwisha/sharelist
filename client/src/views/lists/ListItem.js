import React, { Component } from 'react';
import styled from 'styled-components';

const LI = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
`;

const LiContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ButtonContainer = styled.div`
  padding: 0;
  margin: 0;
  display: inline-flex;
  flex-wrap: nowrap;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 2px;
  outline-color: #72b6c0;
  padding: 0.5rem 0.5rem 0.5rem 22px;

  ::placeholder {
    text-align: center;
    color: #e68303;
    opacity: 0.7;
  }
`;

const Span = styled.span`
  width: 100%;
  padding: 6px 15px;
  margin: 0 auto;
  line-height: 2.3rem;
`;

const SaveBtn = styled.button`
  margin: 0.2rem;
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 3px;
  outline: none;
  background-color: #444daf;
  color: #faf9fa;

  :hover {
    background-color: #1daa5b;
    transition-duration: 180ms;
  }
`;

const CancelBtn = styled(SaveBtn)`
  background-color: #fc7b02;

  :hover {
    background-color: #bd0505;
  }
`;

const EditBtn = styled(SaveBtn)`
  border: 1px solid #ccc;
  background-color: #72b6c0;

  :hover {
    background-color: #2d369d;
  }
`;

const DeleteBtn = styled(SaveBtn)`
  background-color: #e68303;

  :hover {
    background-color: #bd0505;
  }
`;

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
        <LI>
          {this.state.editing ? (
            <LiContainer>
              <Form
                style={{ width: '100%' }}
                onSubmit={(e) => this.editListItem(e, key)}
              >
                <Input
                  data-testid="edit-input"
                  onChange={this.onChange}
                  type="text"
                  name="editItemInput"
                  defaultValue={title}
                />
                <SaveBtn type="submit">Save</SaveBtn>
              </Form>
              <CancelBtn
                data-testid="cancel-edit-button"
                onClick={() => this.toggleEdit(title)}
              >
                &times;
              </CancelBtn>
            </LiContainer>
          ) : (
            <>
              <LeftContainer>
                <label htmlFor={id} style={{ width: '100%' }}>
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
                  <Span
                    style={{
                      textDecoration: !!purchased ? 'line-through' : '',
                      fontStyle: !!purchased ? 'italic' : ''
                    }}
                  >
                    {title}
                  </Span>
                </label>
              </LeftContainer>
              <ButtonContainer>
                <EditBtn
                  data-testid="edit-button"
                  onClick={() => this.toggleEdit(title)}
                >
                  Edit
                </EditBtn>
                <DeleteBtn
                  data-testid="delete-button"
                  onClick={this.props.deleteListItem.bind(this, key)}
                >
                  &times;
                </DeleteBtn>
              </ButtonContainer>
            </>
          )}
        </LI>
      </>
    );
  }
}

export default ListItem;

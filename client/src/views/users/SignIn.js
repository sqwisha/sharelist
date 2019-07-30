import React, { Component } from 'react';
import styled from 'styled-components';

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding-top: 30px;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 2px;
  outline-color: #72b6c0;
  padding: 0.5rem 0.5rem 0.5rem 22px;
  margin: 20px 0;

  ::placeholder {
    text-align: center;
    color: #e68303;
    opacity: 0.7;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
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

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      passwordMatch: true,
      email: '',
      password: ''
    };
  }

  formSubmit = (e) => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    this.props.signIn(email, password);
  };

  onInputChange = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    this.setState({ [name]: e.target.value });
  };

  render() {
    return (
      <FormContainer>
        <Form onSubmit={this.formSubmit}>
          <label htmlFor="email">
            Email
            <Input
              autoComplete="off"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={this.onInputChange}
              defaultValue={this.state.email}
            />
          </label>
          <label htmlFor="password">
            Password
            <Input
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={this.onInputChange}
              defaultValue={this.state.password}
            />
          </label>
          <Button data-testid="sign-in-button">Sign In</Button>
        </Form>
      </FormContainer>
    );
  }
}

export default SignIn;

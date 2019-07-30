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

const Small = styled.small`
  padding: 0;
  margin: 0 0 20px 0;
  display: block;
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

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      passwordMatch: true,
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  formSubmit = (e) => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    if (password.length < 6) {
      alert('Password must be at least 6 characters in length');
      return;
    } else if (password !== this.state.passwordConf) {
      this.setState({ passwordMatch: false });
      return;
    } else {
      this.setState({ passwordMatch: true });
    }

    this.props.signUp(email, password);
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
          <label htmlFor="passwordConf">
            Password Confirmation
            <Input
              autoComplete="off"
              type="password"
              name="passwordConf"
              id="passwordConf"
              placeholder="Enter password again"
              onChange={this.onInputChange}
              defaultValue={this.state.passwordConf}
            />
          </label>
          <Small>Password must be at least 6 characters in length</Small>
          {this.state.passwordMatch ? (
            ''
          ) : (
            <Small>Password and Confirmation must match</Small>
          )}
          <Button data-testid="sign-up-button">Sign Up</Button>
        </Form>
      </FormContainer>
    );
  }
}

export default SignUp;

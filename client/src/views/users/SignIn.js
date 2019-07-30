import React, { Component } from 'react';

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
      <form onSubmit={this.formSubmit}>
        <label htmlFor="email">
          Email
          <input
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
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={this.onInputChange}
            defaultValue={this.state.password}
          />
        </label>
        <button data-testid="sign-in-button">Sign In</button>
      </form>
    );
  }
}

export default SignIn;

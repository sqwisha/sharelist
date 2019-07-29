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
      <form onSubmit={this.formSubmit} autoComplete="off">
        <label htmlFor="email">
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
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={this.onInputChange}
            defaultValue={this.state.password}
          />
        </label>
        <button>Sign In</button>
      </form>
    );
  }
}

export default SignIn;

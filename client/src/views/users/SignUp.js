import React, { Component } from 'react';

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

    if (password !== this.state.passwordConf) {
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
        <label htmlFor="passwordConf">
          <input
            type="password"
            name="passwordConf"
            id="passwordConf"
            placeholder="Enter password again"
            onChange={this.onInputChange}
            defaultValue={this.state.passwordConf}
          />
        </label>
        <small>Password must be at least 6 characters in length</small>
        {this.state.passwordMatch ? (
          ''
        ) : (
          <small>Password and Confirmation must match</small>
        )}
        <button>Sign Up</button>
      </form>
    );
  }
}

export default SignUp;

import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import './App.css';

// Views
import Header from './views/layout/Header';
import List from './views/lists/List';
import Error from './views/errors/Error';
import SignUp from './views/users/SignUp';
import SignIn from './views/users/SignIn';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Guest',
      authData: ''
    };
  }

  updateUser = (result) => {
    if (!result) {
      this.setState({
        user: 'Guest',
        authData: ''
      });
    } else {
      this.setState({
        user: result.user.email,
        authData: result
      });
    }
  };

  signUp = (email, password) => {
    fetch('/api/users/create', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) return Promise.reject(result.error);
        this.updateUser(result.result);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        return alert(error.message);
      });
  };

  signIn = (email, password) => {
    fetch('/api/users/sign_in', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) return Promise.reject(result.error);
        this.updateUser(result.result);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        return alert(error.message);
      });
  };

  logOut = () => {
    fetch('/api/users/logout')
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.updateUser(null);
      });
  };

  render() {
    return (
      <div>
        <Header user={this.state.user} logOut={this.logOut} />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={(routeProps) => (
                <List {...routeProps} user={this.state.user} />
              )}
            />
            <Route
              exact
              path="/sign_up"
              render={(routeProps) => (
                <SignUp {...routeProps} signUp={this.signUp} />
              )}
            />
            <Route
              exact
              path="/sign_in"
              render={(routeProps) => (
                <SignIn {...routeProps} signIn={this.signIn} />
              )}
            />
            <Route exact path="/error" component={Error} />
            <Route
              render={(routeProps) => (
                <List {...routeProps} user={this.state.user} />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);

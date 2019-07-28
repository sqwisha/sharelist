import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import firebase from './Firebase';

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
      console.log(result.user.email);
      this.setState({
        user: result.user.email,
        authData: result
      });
    }
  };

  signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUser(result);
        this.props.history.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        this.props.history.push('/error');
      });
  };

  signIn = () => {};
  logOut = () => {};

  render() {
    return (
      <div>
        <Header
          signIn={this.signIn}
          signUp={this.signUp}
          user={this.state.user}
          logOut={this.logOut}
        />
        <main>
          <Route exact path="/" component={List} />
          {/* <Route path="/sign_up" component={SignUp} /> */}
          <Route
            path="/sign_up"
            render={(routeProps) => (
              <SignUp
                {...routeProps}
                updateUser={this.updateUser}
                signUp={this.signUp}
              />
            )}
          />
          <Route path="/sign_in" component={SignIn} />
          <Route path="/error" component={Error} />
        </main>
      </div>
    );
  }
}

export default withRouter(App);

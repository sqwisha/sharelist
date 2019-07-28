import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <h1 className="App-title">ShareList</h1>

          <Link to="/" className="Link">
            Home
          </Link>
          <nav>
            {this.props.user === 'Guest' ? (
              <>
                <Link to="/sign_up" className="Link">
                  Sign Up
                </Link>
                <Link to="/sign_in" className="Link">
                  Sign In
                </Link>
              </>
            ) : (
              <button onClick={this.props.logOut}>Log Out</button>
            )}
          </nav>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;

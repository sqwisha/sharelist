import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: fit-content;
  color: #000;
  background-color: #1daa5b;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadH1 = styled.h1`
  padding: 1rem 0 0.5rem;
  margin: 0;
  flex-grow: 2;
  font-family: 'Sarina', 'Noto Sans', sans-serif;
`;

const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #faf9fa;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid transparent;

  :hover,
  :active {
    border-bottom: 2px solid #1f202d;
    transition-duration: 150ms;
  }
`;

const Logout = styled(NavLink)``;

class Header extends Component {
  render() {
    return (
      <>
        <HeaderContainer>
          <HeadH1 className="App-title">ShareList</HeadH1>
          <NavContainer>
            <NavLink to="/">Home</NavLink>

            {this.props.user === 'Guest' ? (
              <>
                <NavLink to="/sign_up">Sign Up</NavLink>
                <NavLink to="/sign_in">Sign In</NavLink>
              </>
            ) : (
              <Logout onClick={this.props.logOut}>Log Out</Logout>
            )}
          </NavContainer>
        </HeaderContainer>
      </>
    );
  }
}

export default Header;

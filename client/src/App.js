import React, { Component } from 'react';
import './App.css';
import List from './components/lists/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ShareList</h1>
        </header>
        <List props={ 'hello' } />
      </div>
    );
  }
}

export default App;

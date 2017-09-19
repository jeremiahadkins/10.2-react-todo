import React, { Component } from 'react';
// import logo from './components/logo.svg';
// import './App.css';
import Todo from './Todo';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron">
            <h1>Todo React App</h1>
          </div>
          <Todo />
        </div>
      </div>
    );
  }
}

export default App;

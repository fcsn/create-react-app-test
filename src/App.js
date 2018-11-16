import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
      super(props)
      this.state = {
          todoItems: [],
          todoInput: '',
          // todo 아이템이 들어갈 배열 선언
      }
      this._handleOnClickAddItem = this._handleOnClickAddItem.bind(this)
      this._handleOnChangeTodoInput = this._handleOnChangeTodoInput.bind(this)
  }
    _handleOnClickAddItem () {
      const {todoItems, todoInput} = this.state
      if (todoItems.length === 0) return alert('???')
      const todoItem = {
        // id: todoId++,
        title: todoInput,
        isCompleted: false
      }
      return ''
    }
    _handleOnChangeTodoInput () {
      return ''
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
              <br/>
              {this.state.todoItems}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

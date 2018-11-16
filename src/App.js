import React, { Component } from 'react';
import './App.css';

let todoId = 0

class App extends Component {
  constructor (props) {
      super(props)
      this.state = {
          todoItems: [],
          todoInput: '',
          retrieveInput: ''
          // todo 아이템이 들어갈 배열 선언
      }
      this._handleOnClickAddItem = this._handleOnClickAddItem.bind(this)
      this._handleOnChangeTodoInput = this._handleOnChangeTodoInput.bind(this)
      this._handleOnClickRemove = this._handleOnClickRemove.bind(this)
      this._handleOnClickToggleState = this._handleOnClickToggleState.bind(this)

      this._handleOnChangeInputRetrieve = this._handleOnChangeInputRetrieve.bind(this)
      this._handleOnChangeRetrieveTodo = this._handleOnChangeRetrieveTodo.bind(this)
  }
    _handleOnClickAddItem () {
      const {todoItems, todoInput} = this.state
      if (todoInput.length === 0) return alert('뭐함')
      const todoItem = {
        id: todoId++,
        title: todoInput,
        isCompleted: false
      }
      // const newTodoItems = todoItems.slice(0)
      // ??
      const newTodoItems = todoItems
      newTodoItems.push(todoItem)
      this.setState({ todoItems: newTodoItems, todoInput: '' })
    }

    _handleOnChangeTodoInput (e) {
      this.setState({ todoInput: e.target.value })
    }

    _handleOnClickRemove (id) {
        const { todoItems } = this.state
        const newTodoItems = todoItems.filter(item => item.id !== id)
        this.setState({ todoItems: newTodoItems })
    }

    _handleOnClickToggleState (index) {
        const { todoItems } = this.state
        // const newTodoItems = todoItems.slice(0)
        // ??
        const newTodoItems = todoItems
        newTodoItems[index].isCompleted = !todoItems[index].isCompleted
        this.setState({ todoItems: newTodoItems })
    }

    _handleOnChangeInputRetrieve (e) {
      this.setState({ retrieveInput: e.target.value })
    }

    _handleOnChangeRetrieveTodo () {
       const { todoItems, retrieveInput } = this.state
       // console.log(todoItems)
       // todoItems
       let searchedTodoItems = todoItems.filter((item, index) => {
           return item.title.toLowerCase().indexOf(retrieveInput.toLowerCase()) !== -1 ||
               item.title.indexOf(retrieveInput) !== -1
       })
       console.log(searchedTodoItems)
    }

  render() {
    const renderCancelButton = item => (
        <button className='btn btn-danger btn-sm'
                style={{marginLeft: 5}}
                onClick={() => this._handleOnClickRemove(item.id)}>
            삭제
        </button>
    )
    return (
      <div className="container" style={{ maxWidth: 600, padding: '20px, 0' }}>
        <div className='row' style={{padding: '3rem 1.5rem'}}>
            <div className='col text-center'>
                <div className='input-group'>
                    <input type="text"
                           className='form-control'
                           value={this.state.todoInput}
                           onChange={this._handleOnChangeTodoInput}
                           onKeyDown={e => e.keyCode === 13 ? this._handleOnClickAddItem() : null}/>
                    <div className='input-group-append'>
                        <button className='btn btn-outline-secondary'
                                onClick={this._handleOnClickAddItem}>
                            등록
                        </button>
                    </div>
                </div>

                <div className='input-group' style={ { marginTop: 20 }}>
                    <input type="text"
                           className='form-control'
                           value={this.state.retrieveInput}
                           onChange={this._handleOnChangeInputRetrieve}
                           onKeyDown={e => e.keyCode === 13 ? this._handleOnChangeRetrieveTodo() : null}/>
                    <div className='input-group-append'>
                        <button className='btn btn-outline-secondary'
                                onClick={this._handleOnChangeRetrieveTodo}>
                            검색
                        </button>
                    </div>
                </div>

                <div className='row' style={ { marginTop: 20 } }>
                    <div className='col-6'>
                        <h3>해야할 일</h3>
                        {
                            this.state.todoItems.filter(item => !item.isCompleted).map(item =>
                                <div key={item.id} style={{ margin: 10 }}>
                                    <span style={{ marginRight: 5 }}>{item.id + 1}. {item.title}</span>
                                    <button
                                        className='btn btn-success btn-sm'
                                        onClick={() => this._handleOnClickToggleState(item.id)}
                                    >
                                        완료
                                    </button>
                                    {renderCancelButton(item)}
                                </div>
                            )
                        }
                    </div>

                    <div className='col-6'>
                        <h3>완료한 일</h3>
                        {this.state.todoItems.filter(item => item.isCompleted).map(item =>
                            <div key={item.id} style={{margin: 10}}>
                                <span style={{marginRight: 5}}>{item.id + 1}. {item.title}</span>
                                <button className='btn btn-warning btn-sm'
                                        onClick={() => this._handleOnClickToggleState(item.id)}>
                                    취소
                                </button>
                                {renderCancelButton(item)}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
      </div>
    );
  }
}

export default App;

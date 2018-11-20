import React, { Component } from 'react';
import './App.css';
// import './src/components/TodoTable/TodoTable'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import TodoTable from "../src/components/TodoTable/TodoTable";

let todoId = 0

class App extends Component {
  constructor (props) {
      super(props)

      this.toggle = this.toggle.bind(this);

      this.state = {
          todoItems: [],
          todoInput: '',
          retrieveInput: '',
          category: '업무',
          dropdownOpen: false
      }

      this._handleOnClickAddItem = this._handleOnClickAddItem.bind(this)
      this._handleOnChangeTodoInput = this._handleOnChangeTodoInput.bind(this)
      this._handleOnClickRemove = this._handleOnClickRemove.bind(this)
      this._handleOnClickToggleState = this._handleOnClickToggleState.bind(this)

      this._handleOnClickChangeCategory = this._handleOnClickChangeCategory.bind(this)
      this._handleOnClickFilterTodoItems = this._handleOnClickFilterTodoItems.bind(this)

      this._handleOnChangeInputRetrieve = this._handleOnChangeInputRetrieve.bind(this)
      this._handleOnChangeRetrieveTodo = this._handleOnChangeRetrieveTodo.bind(this)
  }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    _handleOnClickAddItem () {
      const {todoItems, todoInput, category} = this.state
      if (todoInput.length === 0) return alert('뭐함')
      const todoItem = {
        id: todoId++,
        title: todoInput,
        isCompleted: false,
        category: category
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
        console.log(index)
        const { todoItems } = this.state
        // const newTodoItems = todoItems.slice(0)
        // ??
        const newTodoItems = todoItems
        newTodoItems[index].isCompleted = !newTodoItems[index].isCompleted
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
       this.setState({retrieveInput: ''})
    }

    _handleOnClickFilterTodoItems (categ) {
        const {todoItems} = this.state
        const filteredTodoItems = todoItems.filter(item => item.category === categ)
        this.setState({todoItems: filteredTodoItems})
    }

    _handleOnClickChangeCategory (categ) {
        const {category} = this.state
        if (category !== categ) {
            this.setState({category: categ})
        }
    }

  render () {
    // const renderCancelButton = item => (
    //     <button className='btn btn-danger btn-sm'
    //             style={{marginLeft: 5}}
    //             onClick={() => this._handleOnClickRemove(item.id)}>
    //         삭제
    //     </button>
    // )
    return (

      <div className="container" style={{ maxWidth: 600, padding: '20px, 0' }}>
        <div className='row' style={{padding: '3rem 1.5rem'}}>
            {/*{JSON.stringify(this.state.todoItems)}*/}


            <Dropdown className="" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.category}
                </DropdownToggle>
                <DropdownMenu>
                    {/*<DropdownItem header>Header</DropdownItem>*/}
                    <DropdownItem disabled>할 일 카테고리</DropdownItem>
                    <DropdownItem onClick={() => this._handleOnClickChangeCategory('업무')}>업무</DropdownItem>
                    <DropdownItem onClick={() => this._handleOnClickChangeCategory('운동')}>운동</DropdownItem>
                    <DropdownItem onClick={() => this._handleOnClickChangeCategory('교우')}>교우</DropdownItem>
                    {/*<DropdownItem divider />*/}
                    {/*<DropdownItem>Another Action</DropdownItem>*/}
                </DropdownMenu>
            </Dropdown>


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

                </div>

                <div className="container" style={{ maxWidth: 600, padding: '20px, 0' }}>
                    <div className='row' style={{padding: '3rem 1.5rem'}}>
                        <div className='col'>
                            <TodoTable todoItems={ this.state.todoItems }
                                       _handleOnClickToggleState={ this._handleOnClickToggleState}
                                       _handleOnClickRemove={ this._handleOnClickRemove}
                                       _handleOnClickFilterTodoItems={ this._handleOnClickFilterTodoItems}/>
                        </div>
                    </div>
                </div>

        </div>
      </div>
    );
  }
}

export default App;

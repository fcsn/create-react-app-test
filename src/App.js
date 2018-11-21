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
          title: '',
          retrieveInput: '',
          category: '업무',
          dropdownOpen: false,
          isCompletedList: true,
          categoryTab: 'ALL'
      }

      this._handleOnClickAddItem = this._handleOnClickAddItem.bind(this)
      this._handleOnChangeTodoInput = this._handleOnChangeTodoInput.bind(this)
      this._handleOnClickRemove = this._handleOnClickRemove.bind(this)
      this._handleOnClickToggleState = this._handleOnClickToggleState.bind(this)

      this._handleOnClickChangeCategory = this._handleOnClickChangeCategory.bind(this)
      this._handleOnClickFilterTodoItems = this._handleOnClickFilterTodoItems.bind(this)

      this._handleOnChangeInputRetrieve = this._handleOnChangeInputRetrieve.bind(this)
      this._handleOnChangeRetrieveTodo = this._handleOnChangeRetrieveTodo.bind(this)
      this._handleTodoTitleUpdate = this._handleTodoTitleUpdate.bind(this)
  }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    _handleOnClickAddItem () {
      const {todoItems, title, category} = this.state
      if (title.length === 0) return alert('뭐함')
      const todoItem = {
        id: todoId++,
        title: title,
        isCompleted: false,
        category: category
      }
      // const newTodoItems = todoItems.slice(0)
      // ??
      const newTodoItems = todoItems
      newTodoItems.push(todoItem)
      this.setState({ todoItems: newTodoItems, title: '' })
    }

    _handleOnChangeTodoInput (e) {
      // todo todoInput을 title로 바꾸고 computed property name 써보기 -> 그다음엔 todoUnit에 있는 onchange 함수 없애고 본 함수 재활용
      this.setState({ title: e.target.value })
    }

    _handleOnClickRemove (id) {
        const { todoItems } = this.state
        const newTodoItems = todoItems.filter(item => item.id !== id)
        this.setState({ todoItems: newTodoItems })
    }

    _handleOnClickToggleState (index) {
        const { todoItems } = this.state
        const newTodoItems = todoItems
        newTodoItems.filter(item => item.id === index)[0].isCompleted = !newTodoItems.filter(item => item.id === index)[0].isCompleted
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

    _handleTodoTitleUpdate (id, data) {
      const {todoItems} = this.state
      this.setState({todoItems: todoItems.map(item => item.id === id ? {...item, ...data} : item)})
    }

  render () {
    return (
        <div>
            {/*title*/}
            <div className="container" style={{ maxWidth: 600, padding: '20px, 0' }}>
                <div className='row' style={{padding: '3rem 1.5rem .5rem 1.5rem'}}>
                    <div className="col" style={{textAlign: 'center', color: '#6c757d', fontSize: 50, fontWeight: 'Lighter'}}>Todo App</div>
                </div>
            </div>

            {/*todo Input*/}
            <div className="container" style={{ maxWidth: 600, padding: '20px, 0' }}>
                <div className='row' style={{padding: '.5rem 1.5rem .5rem 1.5rem'}}>


                    <Dropdown className="" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            {this.state.category}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem disabled>할 일 카테고리</DropdownItem>
                            <DropdownItem onClick={() => this._handleOnClickChangeCategory('업무')}>업무</DropdownItem>
                            <DropdownItem onClick={() => this._handleOnClickChangeCategory('운동')}>운동</DropdownItem>
                            <DropdownItem onClick={() => this._handleOnClickChangeCategory('교우')}>교우</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>


                        <div className='col text-center'>
                            <div className='input-group'>
                                <input type="text"
                                       className='form-control'
                                       value={this.state.title}
                                       onChange={this._handleOnChangeTodoInput}
                                       name="title"
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



                </div>
            </div>


            {/*Todo Table*/}
            <div className="container" style={{ maxWidth: 600, padding: '20px, 0' }}>
                  <div className='row' style={{padding: '3rem 1.5rem'}}>
                      <div className='col'>
                              <TodoTable isCompletedList={this.state.isCompletedList}
                                         todoItems={ this.state.todoItems.filter(item => !item.isCompleted) }
                                         _handleOnClickToggleState={ this._handleOnClickToggleState}
                                         _handleOnClickRemove={ this._handleOnClickRemove}
                                         _handleOnClickFilterTodoItems={ this._handleOnClickFilterTodoItems}
                                         _handleTodoTitleUpdate={ this._handleTodoTitleUpdate}/>
                      </div>
                      <div className='col'>
                              <TodoTable isUncompletedList={this.state.isCompletedList}
                                         todoItems={ this.state.todoItems.filter(item => item.isCompleted) }
                                         _handleOnClickToggleState={ this._handleOnClickToggleState}
                                         _handleOnClickRemove={ this._handleOnClickRemove}
                                         _handleOnClickFilterTodoItems={ this._handleOnClickFilterTodoItems}
                                         _handleTodoTitleUpdate={ this._handleTodoTitleUpdate}/>
                      </div>
                  </div>
            </div>

        </div>
    );
  }
}

export default App;

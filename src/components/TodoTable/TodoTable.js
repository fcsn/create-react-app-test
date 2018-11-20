import React, { Component } from 'react';
import TodoUnit from '../../../src/components/TodoUnit/TodoUnit'

class TodoTable extends Component {
    static defaultProps = {
        todoItems: [],
        _handleOnClickToggleState: () => { console.warn('not defined.')},
        _handleOnClickRemove: () => { console.warn('not defined.')},
        _handleOnClickFilterTodoItems: () => { console.warn(`not defined.`)}
    }

    constructor (props) {
        super(props)
        // this._handleOnClickUpdate = this._handleOnClickUpdate.bind(this)
    }
    // _handleOnClickUpdate (item) {
    //     const {todoItems} = this.props
    // }

    componentDidUpdate (prevProps, prevState) {
        // console.log(`prevProps: ${prevProps}`)
        // console.dir(prevProps)
        // console.log(`prevState: ${prevState}`)
    }

    render () {
        // const renderUpdateButton = item => (
        //     <button className="btn btn-danger btn-sm"
        //             style={{marginLeft: 5}}
        //             onClick={() => this._handleOnClickUpdate(item)}>
        //         수정
        //     </button>
        // )
        const { todoItems } = this.props
        const todoList = todoItems.map(
            item => <TodoUnit key={item.id}
                              item={item}
                              _handleOnClickToggleState={this.props._handleOnClickToggleState}
                              _handleOnClickRemove={this.props._handleOnClickRemove}
                              isCompletedList={this.props.isCompletedList}/>
        )
        return (
            <div>
                <div className="">
                    <h3 className="pb-3 mb-4 border-bottom" style={{textAlign: 'center'}}>{this.props.isCompletedList ? '해야할 일' : '끝난 일' }</h3>
                    <nav className="blog-pagination" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <button className="btn btn-outline-primary">업무</button>
                        <button className="btn btn-outline-danger" style={{marginLeft: 5}}>운동</button>
                        <button className="btn btn-outline-info" style={{marginLeft: 5}}>교우</button>
                    </nav>
                    {todoList}
                </div>
            </div>
        )
    }
}

export default TodoTable;
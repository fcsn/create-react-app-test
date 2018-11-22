import React, { Component } from 'react';
import TodoUnit from '../../../src/components/TodoUnit/TodoUnit'
import { Fade } from 'reactstrap';

class TodoTable extends Component {
    static defaultProps = {
        todoItems: [],
        _handleOnClickToggleState: () => { console.warn('not defined.')},
        _handleOnClickRemove: () => { console.warn('not defined.')},
        _handleOnClickFilterTodoItems: () => { console.warn(`not defined.`)},
        _handleTodoTitleUpdate: () => { console.warn(`not defined.`) }
    }

    state = {
        fadeIn: true
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //     console.log(nextProps.todoItems === this.props.todoItems)
    //     // console.log()
    //     return nextProps.todoItems !== this.props.todoItems // === false // !== true
    // }

    render () {
        // console.log('render TodoTable')
        const { todoItems } = this.props

        const todoList = todoItems.map(
            item => <TodoUnit key={item.id}
                              item={item}
                              _handleOnClickToggleState={this.props._handleOnClickToggleState}
                              _handleOnClickRemove={this.props._handleOnClickRemove}
                              _handleTodoTitleUpdate={this.props._handleTodoTitleUpdate}
                              isCompletedList={this.props.isCompletedList}/>
        )
        return (
            <div>
                <div className="">
                    <h3 className="pb-3 mb-4 border-bottom" style={{textAlign: 'center'}}>{this.props.isCompletedList ? '해야할 일' : '끝난 일' }</h3>
                    <nav className="blog-pagination" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <button className="btn btn-outline-dark">모두</button>
                        <button className="btn btn-outline-primary" style={{marginLeft: 5}}>업무</button>
                        <button className="btn btn-outline-danger" style={{marginLeft: 5}}>운동</button>
                        <button className="btn btn-outline-info" style={{marginLeft: 5}}>교우</button>
                    </nav>

                    {todoItems.length === 0 ?
                    <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                        <div style={{margin: 10}} className="card flex-md-row mb-4 shadow-sm h-md-250">
                            <div className="card-body d-flex flex-column align-items-start">
                                <strong className="d-inline-block mb-2" style={{fontWeight: 'lighter'}}>{this.props.isCompletedList ? `할 일이 없습니다.` : '끝난 일이 없습니다.'}</strong>
                            </div>
                        </div>
                    </Fade>
                    : todoList}

                </div>
            </div>
        )
    }
}

export default TodoTable;
import React, { Component } from 'react';

class TodoTable extends Component {
    static defaultProps = {
        todoItems: [],
        _handleOnClickToggleState: () => { console.warn('not defined.')},
        _handleOnClickRemove: () => { console.warn('not defined.')},
        _handleOnClickFilterTodoItems: () => { console.warn(`not defined.`)}
    }

    // _handleOnClickToggleState (index) {
    //     const { todoItems } = this.props
    //     // const newTodoItems = todoItems.slice(0)
    //     // ??
    //     const newTodoItems = todoItems
    //     newTodoItems[index].isCompleted = !todoItems[index].isCompleted
    //     this.setState({ todoItems: newTodoItems })
    // }

    render () {
        //     // JSON.stringify(this.props.todoItems)
        //     <div>
        //         {this.props.todoItems.filter(item => !item.isCompleted).map(item =>
        //         <div key={item.id}>{item.id +1}. {item.title}</div>
        //         )}
        //     </div>
        // )
        // const { todoItems, _handleOnClickRemove } = this.props

        const renderCancelButton = item => (
            <button className="btn btn-danger btn-sm"
                    style={{marginLeft: 5}}
                    onClick={() => this.props._handleOnClickRemove(item.id)}>
            삭제
            </button>
        )
        return (
        <React.Fragment>
            <div className='col-6'>
                <h3>해야할 일</h3>
                {this.props.todoItems.filter(item => !item.isCompleted).map(item =>
                        <div key={item.id} style={{ margin: 10 }}>
                            {/*<span>{item.category}/</span>*/}
                            <span style={{ marginRight: 5 }}>{item.id + 1}. {item.title}</span>
                            <button
                                className='btn btn-success btn-sm'
                                onClick={() => this.props._handleOnClickToggleState(item.id)}
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
                {this.props.todoItems.filter(item => item.isCompleted).map(item =>
                    <div key={item.id} style={{margin: 10}}>
                        <span style={{marginRight: 5}}>{item.id + 1}. {item.title}</span>
                        <button className='btn btn-warning btn-sm'
                                onClick={() => this.props._handleOnClickToggleState(item.id)}>
                            취소
                        </button>
                        {renderCancelButton(item)}
                    </div>
                )}
            </div>

            <div className="col-6">
                <button onClick={() => this.props._handleOnClickFilterTodoItems('업무')}>전부</button>
                <button onClick={() => this.props._handleOnClickFilterTodoItems('업무')}>업무</button>
                <button onClick={() => this.props._handleOnClickFilterTodoItems('운동')}>운동</button>
                <button onClick={() => this.props._handleOnClickFilterTodoItems('교우')}>교우</button>
            </div>
    </React.Fragment>
        )
    }
}

export default TodoTable;
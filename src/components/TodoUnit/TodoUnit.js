import React, {Component} from 'react'
import { Fade } from 'reactstrap';


class TodoUnit extends Component {
    constructor (props) {
        super(props)
        this.state = { fadeIn: true }
    }

    render () {
        const {item, _handleOnClickToggleState} = this.props
        const renderCancelButton = item => (
            <button type="button"
                    className="btn btn-danger btn-secondary"
                    onClick={() => this.props._handleOnClickRemove(item.id)}>
                삭제
            </button>
        )

        if (item) {
            return (
                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                    <div style={{margin: 10}} className="card flex-md-row mb-4 shadow-sm h-md-250">
                        <div className="card-body d-flex flex-column align-items-start">
                        <strong className="d-inline-block mb-2 text-success">{item.category}</strong>
                        <h3 className="mb-0 text-dark">{item.title}</h3>
                        {/*<span style={{ marginRight: 5}}>{String(item.isCompleted)}</span>*/}
                        {/*<button className="btn btn-success btn-sm"*/}
                                {/*>*/}
                            {/*완료*/}
                        {/*</button>*/}
                            <div className="btn-group mt-2" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-success btn-secondary"
                                        onClick={() => _handleOnClickToggleState(item.id)}>완료</button>
                                {renderCancelButton(item)}
                            </div>
                        </div>
                    </div>
                </Fade>

                // <div className="col-6">
                //         <button onClick={() => this.props._handleOnClickFilterTodoItems('업무')}>전부</button>
                //     <button onClick={() => this.props._handleOnClickFilterTodoItems('업무')}>업무</button>
                //     <button onClick={() => this.props._handleOnClickFilterTodoItems('운동')}>운동</button>
                //     <button onClick={() => this.props._handleOnClickFilterTodoItems('교우')}>교우</button>
                //     </div>
            )
        }
    }
}

export default TodoUnit;
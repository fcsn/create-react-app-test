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
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => this.props._handleOnClickRemove(item.id)}>
                삭제
            </button>
        )

        if (item) {
            const categoryStyle = {
                fontSize: 16,
                color: item.category === '업무' ? '#007bff' : item.category === '운동' ? '#dc3545' : '#17a2b8'
            }
            return (
                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                    <div style={{margin: 10}} className="card flex-md-row mb-4 shadow-sm h-md-250">
                        <div className="card-body d-flex flex-column align-items-start">
                        <strong className="d-inline-block mb-2" style={categoryStyle}>{item.category}</strong>
                        <h3 className="mb-0 text-dark" style={{fontWeight: 'lighter'}}>{item.title}</h3>
                            <div className="btn-group mt-2" role="group" aria-label="Basic example" style={{paddingTop: '1rem'}}>
                                <button type="button" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => _handleOnClickToggleState(item.id)}>{this.props.isCompletedList ? '완료' : '취소'}</button>
                                {renderCancelButton(item)}
                            </div>
                        </div>
                    </div>
                </Fade>
            )
        }
    }
}

export default TodoUnit;
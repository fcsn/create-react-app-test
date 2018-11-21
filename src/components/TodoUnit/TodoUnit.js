import React, {Component} from 'react'
import { Fade } from 'reactstrap';


class TodoUnit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            fadeIn: true,
            isEdit: false,
            title: '',
            category: '업무'
        }
        this._handleOnClickToggleIsEdit = this._handleOnClickToggleIsEdit.bind(this)
        this._handleOnChange = this._handleOnChange.bind(this)
    }

    _handleOnClickToggleIsEdit () {
        const {isEdit} = this.state
        this.setState({isEdit: !isEdit})
    }

    _handleOnChange (e) {
        // console.log(e.target.value)
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    componentDidUpdate (prevProps, prevState) {
        const { item, _handleTodoTitleUpdate } = this.props
        if (!prevState.isEdit && this.state.isEdit) {
            this.setState({title: item.title, category: item.category})
        }

        if (prevState.isEdit && !this.state.isEdit) {
            _handleTodoTitleUpdate(item.id, {title: this.state.title, category: this.state.category})
        }
    }

    render () {
        const {item, _handleOnClickToggleState, _handleTodoTitleUpdate} = this.props
        // 삭제 button
        const renderCancelButton = item => (
            <button type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => this.props._handleOnClickRemove(item.id)}>
                삭제
            </button>
        )
        // 수정 Button
        const renderUpdateButton = item => (
            <button className="btn btn-danger btn-sm"
                    style={{marginLeft: 5}}
                    onClick={() => this._handleTodoTitleUpdate(item)}>
                수정
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

                            {this.state.isEdit ?
                             <input type="text"
                                    value={this.state.title}
                                    onChange={this._handleOnChange}
                                    name="title"
                                    onKeyDown={e => e.keyCode === 13 ? this._handleOnClickToggleIsEdit() : null}/>
                             : <h3 className="mb-0 text-dark"
                                   style={{fontWeight: 'lighter'}}
                                   onClick={this._handleOnClickToggleIsEdit}>{item.title}</h3>
                            }

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
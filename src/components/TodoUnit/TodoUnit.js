import React, {Component} from 'react'
import './TodoUnit.css'
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
        this._handleOnClickUpdateCategory = this._handleOnClickUpdateCategory.bind(this)
    }

    _handleOnClickToggleIsEdit () {
        const {isEdit} = this.state
        this.setState({isEdit: !isEdit})
    }

    _handleOnClickUpdateCategory (category) {
        const {isEdit} = this.state
        this.setState({isEdit: !isEdit})
    }

    _handleOnChange (e) {
        const {name, value} = e.target
        // todo 수정 시 e.target.value.length가 0이면 수정 안되게 변경
        this.setState({[name]: value})
    }

    componentDidUpdate (prevProps, prevState) {
        const { item, _handleTodoTitleUpdate } = this.props
        if (!prevState.isEdit && this.state.isEdit) {
            // isEdit가 false에서 true로 update되면
            this.setState({title: item.title, category: item.category})
        }

        if (prevState.isEdit && !this.state.isEdit) {
            // isEdit가 true에서 false로 update되면
            _handleTodoTitleUpdate(item.id, {title: this.state.title, category: this.state.category})
        }
    }

    render () {
        // console.log('render TodoUnit')
        const {item, _handleOnClickToggleState} = this.props
        // 삭제 button
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

                            {this.state.isEdit ?
                                <div>
                                    <button onClick={() => this._handleOnClickUpdateCategory('업무')} className="btn is-small btn-sm btn-outline-primary" value="업무">업무</button>
                                    <button onClick={() => this._handleOnClickUpdateCategory('운동')} className="btn btn-sm btn-outline-danger" style={{marginLeft: 5}} value="업무">운동</button>
                                    <button onClick={() => this._handleOnClickUpdateCategory('교우')} className="btn btn-sm btn-outline-info" style={{marginLeft: 5}} value="업무">교우</button>
                                </div>
                             : <strong className="d-inline-block mb-2" style={categoryStyle}
                                       onClick={this._handleOnClickToggleIsEdit}>
                                    {item.id + 1}. {item.category}
                               </strong>
                            }

                            {this.state.isEdit ?
                             <input style={{fontWeight: 'lighter', color: '#282c34', marginTop: 5}}
                                    type="text"
                                    value={this.state.title}
                                    onChange={this._handleOnChange}
                                    name="title"
                                    onKeyDown={e => e.keyCode === 13 ? this._handleOnClickToggleIsEdit() : null}/>
                             : <h3 style={{fontWeight: 'lighter', color: '#343a40'}}
                                   className="mb-0 title"
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
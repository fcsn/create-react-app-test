import React, {Component} from 'react'

class TodoUnit extends Component {
    render () {
        const {item} = this.props
        return (
            <div>
                {item.id + 1}. {item.title}
            </div>
        )
    }
}

export default TodoUnit;
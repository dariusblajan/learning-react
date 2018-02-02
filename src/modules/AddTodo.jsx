import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class AddTodo extends React.Component {
    render () {
        return (
            <div className="add-section">
                <input
                    type="text"
                    id="new-todo"
                    placeholder="What do you need to do?"
                    onKeyUp={this.props.createNewTask}
                />
                <span className="add-button">
                    <FontAwesome className="add-todo" onClick={this.props.createNewTask} tag="i" name="plus" />
                </span>
            </div>
        )
    }
}
import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({
            title: this.props.title,
            done: this.props.done,
            index: this.props.index
        });
    }
    shoudlComponentUpdate(nextProps, nextState) {
        if ((this.props.title != nextProps.title || this.props.done != nextProps.done || this.props.index != nextProps.index)) {
            return true;
        } else {
            return false;
        }
    }
    componentDidMount = () => {
        if (this.props.title === '') {
            this.titleInput.focus();
        }
    }
    editTask = (e) => {
        if (!this.props.done) {
            this.titleInput.focus();
        }
    }
    render() {
        console.log('rendering task with title ' + this.props.title, this.state);
        return (
            <li key={this.props.index}>
                <label id={`todo-${this.props.index}`}>
                    <input
                        type="checkbox"
                        name="done"
                        checked={this.props.done}
                        onChange={this.props.updateTodo(this.props.index, this)}
                        id={`todo-done-${this.props.index}`}
                    />
                    <input
                        type="text"
                        className={`todo-title${this.props.done? ' done' : ''}`}
                        value={this.props.title}
                        title="Click to edit."
                        onChange={this.props.updateTodo(this.props.index, this)}
                        onBlur={this.props.removeLastEmpty(this.props.index, this)}
                        onKeyUp={this.props.createNewTask}
                        disabled={this.props.done}
                        name="title"
                        ref={(input) => {this.titleInput = input;}}
                        id={`todo-title-${this.props.index}`}
                    />
                </label>
                <span className="todo-options">
                    <FontAwesome
                        tag="i"
                        name="pencil"
                        className="edit"
                        onClick={this.editTask}
                    />
                    <FontAwesome
                        tag="i"
                        name="trash"
                        className="delete"
                        onClick={this.props.deleteTask(this.props.index)}
                    />
                </span>
            </li>
        );
    }
};

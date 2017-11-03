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
            id: this.props.id
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if ((this.props.title != nextProps.title || this.props.done != nextProps.done || this.props.id != nextProps.id)) {
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
            <li key={this.props.id}>
                <label id={`todo-${this.props.id}`}>
                    <input
                        type="checkbox"
                        name="done"
                        checked={this.props.done}
                        onChange={this.props.updateTodo(this.props.id, this)}
                        id={`todo-done-${this.props.id}`}
                    />
                    <input
                        type="text"
                        className={`todo-title${this.props.done? ' done' : ''}`}
                        value={this.props.title}
                        title="Click to edit."
                        onChange={this.props.updateTodo(this.props.id, this)}
                        onBlur={this.props.removeLastEmpty(this.props.id, this)}
                        onKeyUp={this.props.createNewTask}
                        disabled={this.props.done}
                        name="title"
                        ref={(input) => {this.titleInput = input;}}
                        id={`todo-title-${this.props.id}`}
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
                        onClick={this.props.deleteTask(this.props.id)}
                    />
                </span>
            </li>
        );
    }
};

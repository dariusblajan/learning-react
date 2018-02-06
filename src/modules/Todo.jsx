import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.text !== nextProps.text ||
            this.props.done !== nextProps.done ||
            this.props.editMode !== nextProps.editMode
        );
    }
    componentDidUpdate() {
        if (this.props.editMode) {
            this.textInput.focus();
        }
    }
    render() {
        const { props } = this;
        
        return (
            <li key={props.id}>
                <input
                    type="checkbox"
                    name="done"
                    checked={props.done}
                    onChange={props.updateTodo(props.id)}
                    id={`todo-done-${props.id}`}
                />
                {!props.editMode && !props.done? (
                    <div className="non-editable">
                        <span className="todo-name">{props.text}</span>
                        <span className="todo-options">
                            <FontAwesome
                                tag="i"
                                name="pencil"
                                className="edit"
                                onClick={props.toggleEditMode(props.id)}
                                />
                            <FontAwesome
                                tag="i"
                                name="trash"
                                className="delete"
                                onClick={props.deleteTask(props.id)}
                                />
                        </span>
                    </div>
                ) : (
                    <label id={`todo-${props.id}`} className="editable">
                        <input
                            type="text"
                            className={`todo-text${props.done? ' done' : ''}`}
                            value={props.text}
                            title="Click to edit."
                            onChange={props.updateTodo(props.id)}
                            onFocus={props.moveCaretAtEnd}
                            onBlur={props.toggleEditMode(props.id)}
                            disabled={props.done}
                            name="text"
                            ref={(input) => {this.textInput = input;}}
                            id={`todo-text-${props.id}`}
                        />
                        {!props.done &&
                        <span className="todo-options">
                            <FontAwesome
                                tag="i"
                                name="floppy-o"
                                className="save"
                                onClick={props.toggleEditMode(props.id)}
                                />
                        </span>
                        }
                    </label>
                )}
            </li>
        );
    }
};

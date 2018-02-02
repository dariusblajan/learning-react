import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.title !== nextProps.title ||
            this.props.done !== nextProps.done ||
            this.props.editMode !== nextProps.editMode ||
            this.props.editMode !== nextProps.editMode
        );
    }
    componentDidUpdate() {
        if (this.props.editMode) {
            this.titleInput.focus();
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
                {!props.editable && !props.done? (
                    <div className="non-editable">
                        <span className="todo-name">{props.title}</span>
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
                            className={`todo-title${props.done? ' done' : ''}`}
                            value={props.title}
                            title="Click to edit."
                            onChange={props.updateTodo(props.id)}
                            onFocus={props.moveCaretAtEnd}
                            onBlur={props.toggleEditMode(props.id)}
                            disabled={props.done}
                            name="title"
                            ref={(input) => {this.titleInput = input;}}
                            id={`todo-title-${props.id}`}
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

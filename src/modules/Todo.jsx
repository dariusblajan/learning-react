import React from 'react';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import jss from 'jss';

const styles = {
    item: {
        marginBottom: 10,
        alignItems: 'center',
        display: 'flex',

        '&:last-child': {
            margin: 0
        }
    },
    itemBody: {
        display: 'flex',
        flex: '1 0'
    },
    todoDone: {
        textDecoration: 'line-through'
    },
    todoName: {
        flex: '1 0',
        padding: 5,
        fontSize: 22,
        lineHeight: '1em'
    },
    actionIcon: {
        cursor: 'pointer',
        bordeRadius: 3,
        fontSize: 25,
        padding: 2,
        margin: '0px 5px'
    },
    textInput: {
        flex: '1 0'
    },
    checkboxInput: {
        flex: '0 1 30px'
    }
};

@withStyles(styles)
class Todo extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.text !== nextProps.text ||
            this.props.done !== nextProps.done ||
            this.props.editModeId !== nextProps.editModeId
        );
    }
    componentDidUpdate() {
        if (this.props.editModeId === this.props.id) {
            this.textInput.focus();
        }
    }
    editModeOnTodo(classes, props) {        
        return (
            <div className={classes.itemBody}>
                <span className={classes.todoName}>{props.text}</span>
                <span>
                    <Icon
                        icon="mode_edit"
                        color="primary"
                        className={classes.actionIcon}
                        onClick={props.toggleEditMode(props.id)}
                    >
                        mode_edit
                    </Icon>
                    <Icon
                        icon="delete_forever"
                        className={classes.actionIcon}
                        color="error"
                        onClick={props.deleteTask(props.id)}
                    >
                        delete_forever
                    </Icon>
                </span>
            </div>
        );
    }
    editModeOffTodo(classes, props) {
        return (
            <div className={classes.itemBody}>
                <TextField
                    className={
                        classes.textInput + (props.done ? (' ' + classes.todoDone) : '')
                    }
                    value={props.text}
                    onChange={props.updateTodo(props.id)}
                    onFocus={props.moveCaretAtEnd}
                    onBlur={props.toggleEditMode(props.id)}
                    disabled={props.done}
                    name="text"
                    inputRef={(input) => {this.textInput = input;}}
                />
                {
                    !props.done &&
                    <span>
                        <Icon
                            icon="save"
                            className={classes.actionIcon}
                            color="action"
                            onClick={props.toggleEditMode(props.id)}
                        >
                            save
                        </Icon>
                    </span>
                }
            </div>
        )
    }
    render() {
        const { props } = this;
        const { classes } = props;
        const editMode = props.editModeId === props.id;
        
        return (
            <li key={props.id} className={classes.item}>
                <Checkbox
                    name="done"
                    className={classes.checkboxInput}
                    checked={props.done}
                    onChange={props.updateTodo(props.id)}
                />
                {
                    !editMode && !props.done ?
                        this.editModeOnTodo(classes, props)
                        :
                        this.editModeOffTodo(classes, props)
                }
            </li>
        );
    }
};

export default Todo;
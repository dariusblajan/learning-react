import React from 'react';
import Icon from 'material-ui/Icon';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = {
    addSection: {
        display: 'flex',
        padding: '0px 15px'
    },
    newTodo: {
        flex: '1 0 40%',
        lineHeight: '1em'
    },
    addTodo: {
        borderRadius: 5,
        padding: '3px 4px',
        textAlign: 'center',
        cursor: 'pointer',
        border: '1px solid #bababa',
        background: '#eaeaea',
        color: '#bababa',
        marginLeft: 15,
        flex: '0 1',
        
        '&:hover': {
            border: '1px solid #30B430',
            color: '#30B430'
        }
    }
}

@withStyles(styles)
class AddTodo extends React.Component {
    render () {
        const { classes } = this.props;

        return (
            <div className={classes.addSection}>
                <Input
                    type="text"
                    className={classes.newTodo}
                    placeholder="What do you need to do?"
                    onKeyUp={this.props.createNewTask}
                />
                <Icon className={classes.addTodo} onClick={this.props.createNewTask} name="plus">add</Icon>
            </div>
        )
    }
}

export default AddTodo;
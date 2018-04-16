import React from 'react';
import TodoList from './TodoList.jsx';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = {
    todosPage: {
        width: '40%'
    },
    pageTitle: {
        textAlign: 'center'
    }
}

@withStyles(styles)
class TodosPage extends React.Component {
    constructor(props, context) {
        super(props);
    }
    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.todosPage}>
                <h2 className={classes.pageTitle}>Todos List</h2>
                <TodoList />
            </Paper>
        )
    }
};

export default TodosPage;
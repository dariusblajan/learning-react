import React from 'react';
import TodosPage from './TodosPage.jsx';
import TaskInfo from './TaskInfo.jsx';
import { Route, Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const styles = {
    content: {
        flex: '1 1 calc(100% - 200px)',
        height: '100%',
        padding: '0px 20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        background: '#dadada'
    }
};

@withStyles(styles)
class Content extends React.Component {
    componentDidCatch(err) {
        console.error(err);
    }
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.content}>
                <Route exact path="/" render={() => (<Redirect to="/todos-list"/>)}/>
                <Route path="/todos-list" render={()=><TodosPage />} exact />
                <Route path="/todos-list/:id" component={TaskInfo} exact />
            </div>
        );
    }
};

export default Content;

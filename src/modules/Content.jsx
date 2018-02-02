import React from 'react';
import TodosPage from './TodosPage.jsx';
import TaskInfo from './TaskInfo.jsx';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export default class Content extends React.Component {
    componentDidCatch(err) {
        console.error(err);
    }
    render() {
        return (
            <div className="content">
                <Route exact path="/" render={() => (<Redirect to="/todos-list"/>)}/>
                <Route path="/todos-list" component={TodosPage} exact></Route>
                <Route path="/todos-list/:id" component={TaskInfo} exact></Route>
            </div>
        );
    }
};

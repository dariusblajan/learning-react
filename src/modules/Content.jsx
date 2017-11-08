import React from 'react';
import TodosList from './TodosList.jsx';
import Another from './Another.jsx';
import { Route } from 'react-router-dom';

export default class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <Route path="/" component={Another} exact></Route>
                <Route path="/todos-list" component={TodosList}></Route>
            </div>
        );
    }
};

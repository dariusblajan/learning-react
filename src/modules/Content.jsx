import React from 'react';
import Other from './Other.jsx';
import Another from './Another.jsx';
import { Route } from 'react-router-dom';

export default class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <Route path="/" component={Another} exact></Route>
                <Route path="/other" component={Other}></Route>
            </div>
        );
    }
};

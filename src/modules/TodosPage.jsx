import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList.jsx';
import FontAwesome from 'react-fontawesome';

TodoList.contextTypes = {
    store: PropTypes.object
}

export default class TodosPage extends React.Component {
    constructor(props, context) {
        super(props);
    }
    render() {
        return (
            <div className="todos-page">
                <h2 className='page-title'>Todos List</h2>
                <TodoList />
            </div>
        )
    }
};
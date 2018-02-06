import React from 'react';
import TodoList from './TodoList.jsx';
import FontAwesome from 'react-fontawesome';

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
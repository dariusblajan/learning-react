import React from 'react';
import TodoList from './TodoList.jsx';
import FontAwesome from 'react-fontawesome';

export default class TodosPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: ''
        }
    }
    createID = (data) => {
        let maxID = Math.max(
            ...(data.length? data.map(item => item.id) : [-1])
        )
        maxID++; 

        return maxID;
    }
    render() {
        return (
            <div className="todos-page">
                <h2 className='page-title'>Todos List</h2>
                <TodoList createID={this.createID} />
            </div>
        )
    }
};
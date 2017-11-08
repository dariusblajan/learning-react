import React from 'react';
import Todos from './Todos.jsx';

export default class TodosPage extends React.Component {
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
                <h2 className='page-title'>Todos</h2>
                <Todos getID={this.createID}/>
            </div>
        )
    }
}
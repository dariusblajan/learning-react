import React from 'react';
import Todos from './Todos.jsx';

export default class Other extends React.Component {
    createID = (data) => {
        console.warn('data received for ID creation', data)
        let maxID = Math.max(
            ...(data.length? data.map(item => item.id) : [-1])
        )
        console.warn('created id', maxID + 1);

        return ++maxID;
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
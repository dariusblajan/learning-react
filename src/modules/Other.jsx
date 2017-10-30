import React from 'react';
import Todos from './Todos.jsx';

export default class Other extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    // componentWillMount() {
    //     fetch(
    //         'https://randomuser.me/api?results=20'
    //     ).then(response => {
    //         return response.json();
    //     }).then(response => {
    //         this.setState({
    //             data: response.results
    //         });
    //     }).catch(error => { 
    //         console.log(error) 
    //     });
    // }
    render() {
        return (
            <div className="todos-page">
                <h2 className='page-title'>Todos</h2>
                <Todos />
            </div>
        )
    }
}
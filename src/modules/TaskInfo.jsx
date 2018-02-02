import React from 'react';

export default class TaskInfo extends React.Component {
    constructor(props) {
        super(props);
        console.warn(`trying to render task with id ${props.match.params.id}`);
    }
    componentDidMount() {
        console.warn('task-info component rendered\nTask data coming soon...');
    }
    render() {
        return (
            <div className="todos-page">
                <h1>This should be a task info page.</h1>
            </div>
        )
    }
}
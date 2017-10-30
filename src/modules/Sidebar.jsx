import React from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleTimeString()
        });
    }
    render() {
        return (
            <aside>
                <p>This should be the sidebar.</p>
                <p>Current time: {this.state.time}</p>
                <ul className='routes'>
                    <li><Link to="/other">Other</Link></li>
                    <li><Link to="/">Root</Link></li>
                </ul>
            </aside>
        )
    }
}
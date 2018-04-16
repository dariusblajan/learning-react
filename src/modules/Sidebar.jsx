import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const styles = {
    sidebar: {
        flex: '0 1 170px',
        height: '100%',
        overflow: 'auto',
        padding: 15
    },
    routes: {
        listStyle: 'none'
    }
}

export default @withStyles(styles)
class Sidebar extends React.Component {
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
        const { classes } = this.props;

        return (
            <aside className={classes.sidebar}>
                <p>This should be the sidebar.</p>
                <p>Current time: {this.state.time}</p>
                <ul className={classes.routes}>
                    <li><Link to="/other">Other</Link></li>
                    <li><Link to="/">Root</Link></li>
                </ul>
            </aside>
        )
    }
}
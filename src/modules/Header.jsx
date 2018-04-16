import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
    header: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        flex: '0 1 55px',
        backgroundColor: '#66bccf'
    },
    title: {
        margin: 0,
        width: '100%'
    }
};

export default @withStyles(styles)
class Header extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <header className={classes.header}>
                <h1 className={classes.title}>My TODO list App</h1>
            </header>
        );
    }
};
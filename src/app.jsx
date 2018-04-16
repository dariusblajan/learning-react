import React from 'react';
import Header from './modules/Header.jsx';
import Content from './modules/Content.jsx';
import Sidebar from './modules/Sidebar.jsx';
import { withStyles } from 'material-ui/styles';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0',
        height: '100%'
    },
    wrapper: {
        display: 'flex',
        left: 0,
        flex: '1 0',
        height: 'calc(100% - 70px)'
    }
};

export default @withStyles(styles)
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidCatch(error, info) {
        console.error(error, info);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Header/>
                <div className={classes.wrapper}>
                    {/* <Sidebar/> */}
                    <Content />
                </div>
            </div>
        );
    }
}
import React from 'react';
import Header from './modules/Header.jsx';
import Content from './modules/Content.jsx';
import Sidebar from './modules/Sidebar.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div className='app-container'>
                <Header/>
                <div className='main-wrapper'>
                    {/* <Sidebar/> */}
                    <Content/>
                </div>
            </div>
        );
    }
}
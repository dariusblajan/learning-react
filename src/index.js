import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import Redux from 'redux';
import { createStore } from 'redux';
import Reducer from './Reducers.js';
import App from './app.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.scss';

const render = Component => {
    ReactDom.render(
        <Provider store={createStore(Reducer)}>
            <AppContainer>
                <Router>
                    <Component />
                </Router>
            </AppContainer>
        </Provider>,
        document.getElementById('app')
    );
};
render(App);

if (module.hot) {
    module.hot.accept('./app.jsx', () => { render(App); });
    module.hot.accept('./Reducers.js', () => { store.replaceReducer(reducer); });
}
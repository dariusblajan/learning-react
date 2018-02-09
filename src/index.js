import polly from 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app.jsx';
import Redux from 'redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';
import Reducer from './reducers/main-reducer'
import './style.scss';

const sagaMiddleware = createSagaMiddleware();

const render = Component => {
    ReactDom.render(
        <Provider store={createStore(Reducer, applyMiddleware(sagaMiddleware))}>
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
sagaMiddleware.run(mySaga);

if (module.hot) {
    module.hot.accept('./app.jsx', () => { render(App); });
    module.hot.accept('./reducers/main-reducer', () => { store.replaceReducer(Reducer); });
}
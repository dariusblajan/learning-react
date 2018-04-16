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
import reducer from './reducers/main-reducer'
import mySaga from './saga';

import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

const styles = jss.createStyleSheet({
    '@global': {
        body: {
            height: 924,
            display: 'flex',
            flexDirection: 'column'
        },
        a: {
            textDecoration: 'none',
            color: 'blue'
        },
        '#app': {
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0',
            height: '100%',
            margin: -8
        },
        '*, :before, :after': {
            boxSizing: 'border-box'
        }
    }
});
styles.attach();

const sagaMiddleware = createSagaMiddleware();

const render = Component => {
    ReactDom.render(
        <Provider store={createStore(reducer, applyMiddleware(sagaMiddleware))}>
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
    module.hot.accept('./reducers/main-reducer', () => { store.replaceReducer(reducer); });
}
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';
import { BrowserRouter } from 'react-router-dom';
import './style.scss';

const render = Component => {
    ReactDom.render(
        <AppContainer>
            <BrowserRouter>
                <Component />
            </BrowserRouter>
        </AppContainer>,
        document.getElementById('app')
    );
}

render(App);

if (module.hot) {
    module.hot.accept('./app.jsx', () => { render(App); });
}
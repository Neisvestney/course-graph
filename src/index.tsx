import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './animations.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, MemoryRouter} from "react-router-dom";

const Router = window.location.href.startsWith('file://') ? MemoryRouter : BrowserRouter

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

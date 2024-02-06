import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./features/store/store";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

reportWebVitals();

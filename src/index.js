import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import 'assets/boxicons-2.0.7/css/boxicons.min.css';
import 'sass/index.scss';
import './firebaseui-styling.global.css'; // Import globally. Not with CSS modules.

import Layout from 'components/Layout'

import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Layout />
         </PersistGate>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

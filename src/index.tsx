import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n/config';
import store, { persistedStore } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';
import axios from 'axios';

axios.defaults.headers["x-icode"] = 'D4D928FF7C10128D';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/*
<React.StrictMode> intentionally invokes certain React lifecycle methods twice, 
including componentDidMount, to help detect potential issues with the code.
<React.StrictMode> is designed to highlight potential problems,
such as side effects, and warn about them during development.
It happens only in development environment,
while in production componentDidMount is called only once even with <React.StrictMode>.
*/

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

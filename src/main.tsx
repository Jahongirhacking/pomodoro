import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style.scss';
import { Provider } from 'react-redux';
import store from './features/store.ts';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

import React from 'react';
import './App.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppContainer from './containers/App';
import configureStore from './configureStore';
import history from './utils/history';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore({}, history);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </Provider>
  );
}

export default hot(module)(App);

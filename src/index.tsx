import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
//import store from './store'
import configureStore from './configureStore';
import { createHashHistory } from 'history';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import gql from "graphql-tag";

//const history = createHashHistory();
//const initialState = window.initialReduxState;
const store = configureStore();

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

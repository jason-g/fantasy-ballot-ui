import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
//import { Router, Route } from 'react-router'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
//import store from './store'
import configureStore from './configureStore';
//import pages and components
import App from './App';
import Login from './pages/login';
import Signup from './pages/signup';
import Navigation from './components/navigation';

const store = configureStore();

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
  <Navigation>
  </Navigation>
    <Router>
      <div>
        <Route path="/signup" key="1" component={Signup} />
        <Route path="/ballot" key="2" component={App} />
        <Route path="/login" key="3" component={Login} />
      </div>
    </Router>
  </Provider>,
  rootElement
)

serviceWorker.unregister();

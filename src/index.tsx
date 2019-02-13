import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
//import { Router, Route } from 'react-router'
import { Route, Link, Router, Redirect } from 'react-router-dom'
import history from './components/history'
//import store from './store'
import configureStore from './configureStore';
//import pages and components
import App from './App';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/signup';
import Navigation from './components/navigation';
import Progress from 'reactstrap/lib/Progress';
import BallotProgress from './components/progress';
import administration from './pages/administration';
import results from './pages/results';
import EditUser from './pages/edituser';
import passwordReset from './pages/passwordReset';
import requestChange from './pages/requestChange';

const store = configureStore();

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className="main-body">
        <Navigation>
            <BallotProgress history={history} />
        </Navigation>
        <Route path="/" key="0" component={App} />
        <Route path="/signup" key="1" component={Signup} />
        <Route path="/ballot" key="2" component={App} />
        <Route path="/login" exact key="3" component={Login} />
        <Route path="/logout" exact key="4" component={Logout} />
        <Route path="/editUser" exact key="7" component={EditUser} />
        <Route path="/request-change" exact key="8" component={requestChange} />
        <Route path="/reset-password" exact key="9" component={passwordReset} />
        <Route path="/results" exact key="5" component={results} />
        <Route path="/administration" exact key="6" component={administration} />
      </div>
    </Router>
  </Provider>,
  rootElement
)

serviceWorker.unregister();

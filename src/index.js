import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import UserProfile from './components/profile/UserProfile';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route  path="/login" component={Login}/>
      <Route  path="/signout" component={Signout}/>
      <Route  path="/signup" component={Signup}/>
      <Route  path="/user/:userId" component={UserProfile}/>
    </Switch>
  </BrowserRouter>,
document.getElementById('root'));

serviceWorker.unregister();
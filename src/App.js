import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import Incomes from './pages/Incomes';
import Expenses from './pages/Expenses';
import Types from './pages/Types';
import SignIn from './pages/SignIn';
import Logout from './pages/Logout';
import Signup from './pages/Signup';


const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/user" exact={true} component={User}></Route>
      <Route path="/incomes" exact={true} component={Incomes}></Route>
      <Route path="/expenses" exact={true} component={Expenses}></Route>
      <Route path="/type" exact={true} component={Types}></Route>
      <Route path="/signin" exact={true} component={SignIn}></Route>
      <Route path="/signup" exact={true} component={Signup}></Route>
      <Route path="/logout" exact={true} component={Logout}></Route>
    </Switch>
  </Router>
);
export default App;

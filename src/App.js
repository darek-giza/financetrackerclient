import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import Incomes from './pages/Incomes';
import Expenses from './pages/Expenses';
import Types from './pages/Types';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard'
import 'typeface-roboto'


const App = () => (
  <Router>
    <Dashboard>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/user" exact={true} component={User}/>
        <Route path="/incomes" exact={true} component={Incomes}/>
        <Route path="/expenses" exact={true} component={Expenses}/>
        <Route path="/type" exact={true} component={Types}/>
        <Route path="/signin" exact={true} component={SignIn}/>
        <Route path="/signup" exact={true} component={Signup}/>
      </Switch>
    </Dashboard>
  </Router>
);
export default App;

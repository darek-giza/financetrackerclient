import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Incomes from './pages/Incomes';
import Expenses from './pages/Expenses';
import Types from './pages/Types';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard'
import 'typeface-roboto'
import './App.css';
import Chart2020 from "./components/Charts/ChartYearly";

const App = () => (
  <Router>
    <Dashboard>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/incomes" exact={true} component={Incomes}/>
        <Route path="/expenses" exact={true} component={Expenses}/>
        <Route path="/type" exact={true} component={Types}/>
        <Route path="/signin" exact={true} component={SignIn}/>
        <Route path="/signup" exact={true} component={Signup}/>
        <Route path="/chart" exact={true} component={Chart2020}/>
      </Switch>
    </Dashboard>
  </Router>
);
export default App;

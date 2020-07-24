import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
import Header from './components/HEADER/Header'
import List from './components/CRUD/list/List';
import EditDetails from './components/CRUD/editDetails';
import AddDetails from './components/CRUD/CreateDetails';
class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/edit/:id" component={EditDetails} />
            <Route exact path="/addDetails" component={AddDetails} />
          </Switch>
        </div>

      </Router>

    );
  }
}

export default App;

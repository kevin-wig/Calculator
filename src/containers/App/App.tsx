import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { Provider } from 'mobx-react';

import history from '../../shared/history';
import Dashboard from '../Dashboard/Dashboard';

import './App.scss';

function App() {
  return (
    <Provider>
      <Router history={history}>
        <Switch>
          <div className="App">
            <Redirect exact from="/" to="/Dashboard" />
            <Route exact path="/Dashboard" component={() => <Dashboard />} />
            <Redirect path="*/**" to="/Dashboard" />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

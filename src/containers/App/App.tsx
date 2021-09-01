import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';

import history from '../../shared/history';
import Dashboard from '../Dashboard/Dashboard';

import './App.scss';

function App() {
    return (
        <Router history={history}>
            <div className="App">
                <Switch>
                    <Redirect exact from="/" to="/Dashboard" />
                    <Route exact path="/Dashboard" component={Dashboard} />
                    <Redirect path="*/**" to="/Dashboard" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

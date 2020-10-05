import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from '../components/iam/home';

import DrogWrapper from '../components/drog/drogElement';

function RouteRender() {
    return (
        <Router >
            <Route path="/" component={Home}>
            </Route>
        </Router>

    );
}

export default RouteRender;
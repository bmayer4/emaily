import React, { Component } from 'react';  
import { BrowserRouter, Route, Router } from 'react-router-dom';  //replaced BrowserRouter with Router to use history
import Header from '../components/Header';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/index';
import Landing from '../components/Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

import createHistory from 'history/createBrowserHistory';  //I didn't need to install anything here
export const history = createHistory();




class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <Router history={history}>
            <div className="container">
            <Header />
            <Route path="/" component={Landing} exact />
            <Route path="/surveys" component={Dashboard} exact />
            <Route path="/surveys/new" component={SurveyNew} />
            </div>
            </Router>
        );
    }
};


const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser())
});

export default connect(undefined, mapDispatchToProps)(App);
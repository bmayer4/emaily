import React, { Component } from 'react';  
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/index';
import Landing from '../components/Landing';

const Dashboard = () => (<h2>Dashboard</h2>)
const SurveyNew = () => (<h2>SurveyNew</h2>)




class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
            <BrowserRouter>
            <div>
            <Header />
            <Route path="/" component={Landing} exact />
            <Route path="/surveys" component={Dashboard} exact />
            <Route path="/surveys/new" component={SurveyNew} />
            </div>
            </BrowserRouter>
            </div>
        );
    }
};


const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser())
});

export default connect(undefined, mapDispatchToProps)(App);
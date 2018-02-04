import React, { Component } from 'react';
import { fetchSurveys, removeSurvey } from '../../actions/index';
import { connect } from 'react-redux';

class SurveyList extends Component {

    componentDidMount = () => {
        this.props.fetchSurveys()
    }

    // componentWillUpdate() {
    //     console.log('componentWillUpdate called');
    //     this.props.fetchSurveys()
    // }
    

    removeClicked = (id) => {
        this.props.removeSurvey(id);
    }

    render() {
        return (
            <div>
            {this.props.surveys && this.props.surveys.reverse().map((survey) => {
                return (
                            <div className="card darken-1" key={survey._id}>
                            <div className="card-content">
                              <span className="card-title">{survey.title}</span>
                              <p>{survey.body}</p>
                              <p className="right">Send on: {new Date(survey.dateSent).toLocaleDateString()}</p>
                            </div>
                            <div className="card-action">
                              <a>Yes: {survey.yes}</a>
                              <a>No: {survey.no}</a>
                              <a className="right grey-text" onClick={() => {this.removeClicked(survey._id)}}>Delete Survey</a>
                            </div>
                          </div>
                        )
            })}
            </div>
        );
    }
};


const mapStateToProps = (state, props) => {
    console.log('state', state);
    return {
        surveys: state.surveys
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeSurvey: (id) => dispatch(removeSurvey(id)),
        fetchSurveys: () => dispatch(fetchSurveys())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);
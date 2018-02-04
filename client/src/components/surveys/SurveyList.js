import React, { Component } from 'react';
import { fetchSurveys } from '../../actions/index';
import { connect } from 'react-redux';

class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys = () => {
        console.log(this.props.surveys.length);
    return this.props.surveys.surveys && this.props.surveys.surveys.reverse().map((survey) => {
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
                    </div>
                  </div>
                )
    });
    }

    render() {
        return (
            <div>
            {this.renderSurveys()}
            </div>
        );
    }
};


const mapStateToProps = (state, props) => {
    return {
        surveys: state.surveys
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSurveys: () => dispatch(fetchSurveys())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);
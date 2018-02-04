import React, { Component } from 'react';

import SurveyForm from './SurveyForm';
import { reduxForm } from 'redux-form';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    state = {
        showFormReview: false
    };

    handleSubmit = () => {
        this.setState(() => ({
            showFormReview: true
        }));
    };

    handleOnCancel = () => {
        this.setState(() => ({
            showFormReview: false
        }));
    };

    render() {
        return (
            <div>
            {
               (this.state.showFormReview) ? <SurveyFormReview onCancel={this.handleOnCancel} /> : <SurveyForm onSurveySubmit={this.handleSubmit} />
            }
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'  //now destroyOnUnmount is default to true!, so that happens if this component gets ummounted
})(SurveyNew);
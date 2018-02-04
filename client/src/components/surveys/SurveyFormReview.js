import React from 'react';
import { connect } from 'react-redux';

import FIELDS from './formFields';
import { submitSurvey } from '../../actions/index';
import { history } from '../App';



const SurveyFormReview = (props) => {

    const fields = FIELDS.map(({ name, label }) => {
        return (
          <div key={name}>
            <label>{label}</label>
            <div>{props.formValues[name]}</div>
          </div>
        );
      });

    const submitSurvey = () => {
        props.submitSurvey(props.formValues);
        history.push('/');
    }

    return (
        <div>
          <h5>Please confirm your entries</h5>
            {fields}
          <button className="yellow darken-3 white-text btn-flat" onClick={props.onCancel}>
            Back
          </button>
          <button className="cyan darken-1 btn-flat white-text right" onClick={submitSurvey}>
          Send Survey
          </button>
        </div>
      );
  
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values
  };
};

const mapDispatchToProps = (dispatch) => ({
    submitSurvey: (values) => dispatch(submitSurvey(values))
    });

export default connect(mapStateToProps, mapDispatchToProps)(SurveyFormReview);

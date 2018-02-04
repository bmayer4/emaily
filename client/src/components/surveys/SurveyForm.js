import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';

import validateEmails from './../../utils/validateEmails';
import FIELDS from './formFields';

class SurveyForm extends Component {

    onSubmit = (values) => {
       console.log(values);
        this.props.onSurveySubmit();
    };

    rendeFields = () => {
        return (
            <div>
            {
                FIELDS.map(({name, label}) => {
                    return <Field
                    key={name}
                    type="text"
                    label={label}
                    name={name}
                    component={SurveyField}
                    />
                })
            }
            </div>
        );
    };


    render() {
        const { handleSubmit } = this.props  //props are given to us when we wire up the component to redux
        return (
            <div>
            <form onSubmit={handleSubmit(this.onSubmit)}>
            {this.rendeFields()}
            <Link to="/surveys" className="btn-flat left white-text cyan darken-1">Cancel</Link>
            <button className="btn-flat right white-text cyan darken-1">
              Next
            </button> 
            </form>
            </div>
        );
    }
}

const validate = (values) => {

    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    if (values.recipients && values.recipients.trim().charAt(values.recipients.length - 1) === ',') {
        errors.recipients = 'Can not end in a comma!';
    }

    FIELDS.forEach(({name}) => {
        if (!values[name]) {
            errors[name] = `${name} required`;
        }
    });

    return errors
};

export default reduxForm({
    validate: validate,
    form: 'surveyForm',  //I could give other form components this mame of surveyForm, and they would share values making a step by step form easy
    destroyOnUnmount: false     //default is true
})(SurveyForm);
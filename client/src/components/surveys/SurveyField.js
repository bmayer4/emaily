//SurveyField contains logic to render a single label and text input
import React from 'react';

const SurveyField = ({ input, label, meta }) => (  //input is passed from redux-form, label is my custom prop
    <div>
    <label>{label}</label>
    <input {...input} type="text" style={{marginBottom: "8px"}}/>
    {meta.submitFailed &&(meta.error && <div style={{color: "red", marginBottom: "5px"}}>{meta.error}</div>)}   
</div>
);

export default SurveyField;
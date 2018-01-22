import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions/index';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
            name="Emaily"
            description="$5 for 5 email credits"
            amount={500}   //cents
            token={(token) => this.props.handleToken(token)}       //callback, object we get back from stripe that represents entire charge, should have been called onToken
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
             >
             <button className="btn">Add Credits</button>
             </StripeCheckout>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    handleToken: (token) => dispatch(handleToken(token))
});

export default connect(undefined, mapDispatchToProps)(Payments);

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);   //this format is from stripe docs
const requireLogin = require('../middleware/requireLogin.js');

module.exports = (app) => {

app.post('/api/stripe/', requireLogin, async (req, res) => {

    const charge = await stripe.charges.create({  //returns a promise
        amount: 500,
        currency: 'usd',
        description: 'Purchase 5 credits for $5',
        source: req.body.id    //token object id sent from stripe after form is submitted.
    });

    console.log(charge);
    //get a reference to the current user model, w passport a signed in user can be accessed with req.user
    console.log('userrrrr', req.user); //actual user model from mongoose
    req.user.credits +=5;
    const user = await req.user.save();  //save is asynchronous request, we make use of user to ensure we have most recent user model copy, basically same as req.user
    res.send(user);   //axios call uses this
});

};
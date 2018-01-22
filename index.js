const express = require('express');  //use require on server side, import on front end
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User.js');  //make sure this is required before anything that depends on it
require('./services/passport');  //we aren't pulling anything out of this file, nothing was exported
const authRoutes = require('./routes/authRoutes');  //authRoutes is a function that takes app arg
const billingRoutes = require('./routes/billingRoutes');

//mongoURI is from mlab
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    keys: [keys.cookieKey]
   })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
    //make sure express will server up production assets, like our main.js file, or main.css file
    //for a particular file in a particular directory
    //if can't recognize route or file being requested, lool ino client/build directory for it
    app.use(express.static('client/build'));

    //if above doesn't match what is being requested, below is like a catch all (order is important)
    //express will serve up the index.html file if it doesn't recognize the route
    const path = require('path');

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;  //process.env.PORT is set up by heroku

app.listen(PORT, () => {
    console.log(`Server is up!`);
});


const express = require('express');  //use require on server side, import on front end
require('./models/User.js');   //must go first, so schema is defined before we use it below
require('./services/passport');  //we aren't pulling anything out of this file, nothing was exported
const authRoutes = require('./routes/authRoutes');  //authRoutes is a function that takes app arg
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

//mongoURI is from mlab
mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    keys: [keys.cookieKey]
   })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up!`);
});


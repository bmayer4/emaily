const passport = require('passport');

module.exports = (app) => {

//strategy we set up recognized with string 'google' 
//scope specifies to google what access we want inside users profile (google has list of specific permissions we can as for)
app.get('/auth/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

app.get('/auth/google/callback', passport.authenticate('google'));

}
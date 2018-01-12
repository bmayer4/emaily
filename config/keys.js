//commit this so app knows what to do in dev or prod

//heroku sets up this environment variable for us to production
if (process.env.NODE_ENV === 'production') {
    //return the prod set of keys
    module.exports = require('./prod');
} else {
    //return the dev set of keys
    module.exports = require('./dev');  //pull dev set of keys in and immediately pass back to whover is asking for the keys (from this file)
}
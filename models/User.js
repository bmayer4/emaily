const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// mongoose.model('users', userSchema);  //first arg should be singular...
mongoose.model('User', userSchema);

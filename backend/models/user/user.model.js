//Mongoose Schema for Todo Object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema ({
    user_id: {
        type: String
    },
    profilepicture: {
        type: String
    },
    username: {
        type: String
    },
    password:{
        type: String
    },
    score:{
        type: Number
    },
    level:{
        type: Number
    },
    role:{
        type: String
    },
});

module.exports = mongoose.model('User', User)
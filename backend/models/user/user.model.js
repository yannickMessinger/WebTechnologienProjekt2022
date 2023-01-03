//Mongoose Schema for User Object
import mongoose from "mongoose";
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

export default mongoose.model('User', User)

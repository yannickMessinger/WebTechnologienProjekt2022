//Mongoose Schema for User Object
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
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

User.plugin(passportLocalMongoose);

export default mongoose.model('User', User)

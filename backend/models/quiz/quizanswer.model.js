//Mongoose Schema for Quizanswer Object
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Answer = new Schema ({
    answer_id: {
        type: String
    },
    answer_content: {
        type: String
    },
   
});

module.exports = mongoose.model('Answer', Answer)

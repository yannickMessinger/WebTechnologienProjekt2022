//Mongoose Schema for Quizquestion Object
import Answer from "./quizanswer.model";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Quizquestion = new Schema ({
    question_id: {
        type: String
    },
    question_content: {
        type: String
    },
    possible_answers: {
        type: [Answer]
    },
    correct_answer:{
        type: String
    },
    hints: {
        type: [String]
    }
});

module.exports = mongoose.model('Quizquestion', Quizquestion)

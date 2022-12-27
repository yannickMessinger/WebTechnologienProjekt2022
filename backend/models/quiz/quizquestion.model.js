//Mongoose Schema for Quizquestion Object
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
        type: [{answer_id: String, answer_content: String}]
    },
    correct_answer:{
        type: String
    },
    hints: {
        type: [String]
    }
});

export default mongoose.model('Quizquestion', Quizquestion)

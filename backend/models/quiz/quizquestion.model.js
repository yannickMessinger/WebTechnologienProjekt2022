//Mongoose Schema for Todo Object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Quizquestion = new Schema ({
    question_id: {
        type: String
    },
    question_content: {
        type: String
    },
    possible_answers: {
        type: [String]
    },
    correct_answer:{
        type:String
    }
});

module.exports = mongoose.model('Quizquestion', Quizquestion)
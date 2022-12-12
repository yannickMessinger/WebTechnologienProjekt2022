import Quizquestion from "quizquestion.model.js";
import Category from "category.model.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Quiz = new Schema({
    quiz_id: {
        type: String
    },
    quiz_questions: {
        type: [Quizquestion]
    },
    category: {
        type: Category
    }
})

module.exports = mongoose.model('Quiz', Quiz);

import Quiz from "quiz.model.js";
import Category from "./category.model.js";
import mongoose, {mongo} from "mongoose";
const Schema = mongoose.Schema;

const QuizGame = new Schema({
    quizzes: {
        type: [Quiz]
    },
    categories: {
        type: [Category]
    },
})

module.exports = mongoose.model("QuizGame", QuizGame);

import Quiz from "./quiz.model.js";
import Category from "./category.model.js";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuizGame = new Schema({
    quizzes: {
        type: [{
            quiz_questions: {
                type: [{
                    question_id: {
                        type: String
                    },
                    question_content: {
                        type: String
                    },
                    possible_answers: {
                        type: [String]
                    },
                    correct_answer: {
                        type: String
                    },
                    hints: {
                        type: [String]
                    }
                }]
            },
            category: {
                type: {
                    id: {
                        type: String
                    },
                    name: {
                        type: String
                    }
                }
            }}]
    },
    categories: {
        type: [String]
    },
})

export default mongoose.model("QuizGame", QuizGame);

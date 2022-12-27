import Quizquestion from "./quizquestion.model.js";
import Category from "./category.model.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Quiz = new Schema({
    quiz_id: {
        type: String
    },
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
    }
})

export default mongoose.model('Quiz', Quiz);

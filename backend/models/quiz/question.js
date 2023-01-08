import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    quizId:String,
    question_content: String,
    possible_answers: [String],
    correct_answer: String,
    category: String,
    hint: String
})

export default mongoose.model('Question', questionSchema);

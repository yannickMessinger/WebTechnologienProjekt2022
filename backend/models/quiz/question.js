import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    possibleAnswers: [String],
    correctAnswer: String,
    category: String,
    hint: [String]
})

export default mongoose.model('Question', questionSchema);

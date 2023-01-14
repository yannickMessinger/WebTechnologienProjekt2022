export interface IQuizquestion {
    quizId: string,
    question_content: string;
    possible_answers: string[];
    correct_answer: string;
    category: string;
    hint: string;
}

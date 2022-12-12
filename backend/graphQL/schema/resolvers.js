import Quiz from "../../models/quiz/quiz.model.js"

const resolvers = {
    Query: {
        getRandomCategories: async() => {
            const allQuizzes = await Quiz.find();
            const shuffled = [...allQuizzes].sort(() => 0.5 - Math.random());
            console.log(shuffled.slice(0, 3).map(quiz => quiz.category));
            return shuffled.slice(0, 3).map(quiz => quiz.category);
        },
        getRandomQuizByCategory: async(category: string) => {
            const allQuizzes = await Quiz.find();
            const quizOfOneCategory = allQuizzes.map(quiz => quiz.category === category);
            return quizOfOneCategory[Math.floor(Math.random() * quizOfOneCategory.length)];
        }
    }
}

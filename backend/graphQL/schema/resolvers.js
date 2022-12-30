import Question from "../../models/quiz/question.js";
import { PubSub } from "graphql-subscriptions";
import User from "../../models/user/user.model.js";
const NEW_QUESTION = "NEW_QUESTION";
const pubsub = new PubSub();

const resolvers = {
  Query: {
    quizCategory: async (category) => {
      const questions = await Question.find({ category: category }).exec();
      return questions;
    },
    categories: async () => {
      const questions = await Question.find();
      let categories = [];
      for (let q of questions) {
        if (!categories.includes((await q).category)) {
          categories.push((await q).category);
        }
      }
      return categories;
    },
  },
  Mutation: {
    createQuestion: async (root, args) => {
      const newQuestion = new Question({
        question: args.question,
        possibleAnswers: args.possibleAnswers,
        correctAnswer: args.correctAnswer,
        category: args.category,
        hint: args.hint,
      });
      await newQuestion.save();
      pubsub.publish(NEW_QUESTION, {
        newQuestion: "newQuestion"
      })
      return newQuestion;
    },
  },

  Subscription: {
    newQuestion: {
      subscribe: (_,__,{ pubsub }) => pubsub.asyncIterator(NEW_QUESTION),
    },
  },
};

export default resolvers;

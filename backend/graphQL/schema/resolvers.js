import Question from "../../models/quiz/question.js";
import { PubSub } from "graphql-subscriptions";
import User from "../../models/user/user.model.js";
const NEW_QUESTION_CATEGORY = "NEW_QUESTION_CATEGORY";
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    quizCategory: async (root, args) => {
      const questions = await Question.find({ category: args.category }).exec();
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
      pubsub.publish(NEW_QUESTION_CATEGORY, {
        newQuestionCategory: newQuestion.category
      })
      return newQuestion;
    },
  },

  Subscription: {
    newQuestionCategory: {
      subscribe: () => pubsub.asyncIterator([NEW_QUESTION_CATEGORY]),
    },
  },
};


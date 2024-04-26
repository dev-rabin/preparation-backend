const express = require("express");
const QuizController = require("../controllers/quiz_controller");
const QuizRouter = express.Router();

QuizRouter.post("/createquiz", QuizController.createQuiz);
QuizRouter.post("/quizquestions",QuizController.quizQuestions);
QuizRouter.post("/questionoptions",QuizController.qustionOptions);
QuizRouter.get("/quizzes",QuizController.fetchQuiz);
QuizRouter.get("/quizzes/:quiz_id",QuizController.fetchQuizQuestionsbyQuizId);
QuizRouter.get("/quizzes/questionoptions/:question_id",QuizController.fetchOptionsByQuestionId);

module.exports = QuizRouter;
const express = require("express");
const LessonRouter = express.Router();
const {LessonController,uploads} = require("../controllers/lesson_controller")

LessonRouter.post("/createlesson",uploads.single("video_url"),LessonController.createLesson);
LessonRouter.get("/lesson",LessonController.getLessonByModuleId);

module.exports = LessonRouter;
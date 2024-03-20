const express = require("express");
const CourseController = require("../controllers/course_controller");
const CourseRouter = express.Router();


CourseRouter.post("/createcourse", CourseController.createCourse);
CourseRouter.get("/coursedetails/:course_id",CourseController.getCourseByCourseId);


module.exports = CourseRouter;
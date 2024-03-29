const express = require("express");
const CourseController = require("../controllers/course_controller");
const CourseRouter = express.Router();


CourseRouter.post("/coursecreate", CourseController.createCourse);
CourseRouter.get("/courses",CourseController.getAllCourses);
CourseRouter.get("/courses/:course_id",CourseController.getCourseByCourseId);


module.exports = CourseRouter;
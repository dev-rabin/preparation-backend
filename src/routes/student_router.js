const express = require("express");
const StudentRouter = express.Router();
const StudentController = require("../controllers/student_controller");

StudentRouter.post("/studentregister", StudentController.studentRegistration);
StudentRouter.post("/login",StudentController.studentLogin);




module.exports = StudentRouter;
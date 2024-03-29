const express = require("express");
const StudentRouter = express.Router();
const StudentController = require("../controllers/student_controller");
const verifyToken = require("../middleware/verifyToken")

StudentRouter.post("/studentregister", StudentController.studentRegistration);
StudentRouter.post("/login",StudentController.studentLogin);
StudentRouter.get("/student",verifyToken,StudentController.getStudentByToken);




module.exports = StudentRouter;
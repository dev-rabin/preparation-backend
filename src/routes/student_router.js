const express = require("express");
const StudentRouter = express.Router();
const {StudentController,uploads }= require("../controllers/student_controller");
const verifyToken = require("../middleware/verifyToken")

StudentRouter.post("/studentregister",uploads.single('profile') ,StudentController.studentRegistration);
StudentRouter.post("/login",StudentController.studentLogin);
StudentRouter.get("/student",verifyToken,StudentController.getStudentByToken);


module.exports = StudentRouter;
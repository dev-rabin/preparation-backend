const express = require("express");
const app = express();
const port = 5000;
const connection = require("./src/connection");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/uploads/videos', express.static('uploads/videos'));

app.listen(port,()=>{
console.log(`server is connected to port ${port}`);
})

app.get("/",(req,res)=>{
    connection.ping((err)=>{
    if (err) {
        console.log("Server is down!");
        return res.send("Server is down!");
    } else{
        console.log("Preparation is Online...");
       return res.send("Preparation Online...");
    }
    })
  
})

//Student Router
const StudentRouter = require("./src/routes/student_router");
app.use("/api", StudentRouter);

//Course Router
const CourseRouter = require("./src/routes/course_router");
app.use("/api",CourseRouter);


//Course module Router
const ModuleRouter = require("./src/routes/module_router");
app.use("/api",ModuleRouter);


//Module Lessons Router
const LessonRouter = require("./src/routes/lesson_router");
app.use("/api",LessonRouter);


//Quiz Router
const QuizRouter = require("./src/routes/quiz_router");
app.use("/api",QuizRouter);
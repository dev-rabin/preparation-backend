const db = require("../connection");

const CourseController = {
    createCourse : (req, res) => {
        const {name,description,price,is_progress_limited} = req.body;
        const query = "insert into course (name,description,price,is_progress_limited) values (?,?,?,?)";
        db.query(query,[name,description,price,is_progress_limited],(err,result)=>{
            if (err) {
                console.error("Error during creating course : ", err);
                return res.status(400).json({success: false, message : err.message});
            }else{
                console.log("Course created successfully");
                return res.status(200).json({success:true, message: "Course created successfully",id : result.insertId});
            }
        })
    },
    getCourseByCourseId : (req,res) =>{
        const course_id = req.params.class_id;
        const query = "select * from course where course_id = ?";
        db.query(query,course_id,(err,result)=>{
            if (err) {
                console.error("Error getting course details by course id : ", err);
                return res.status(400).json({success:false,message:err.message});
            } else{
                const courseData = result[0];
                console.log("Course data by course id : ", courseData);
                return res.status(200).json({success:true,message:"Course details fetched succeesfully"});
            }
        })
    },
    getAllCourses : (req,res) =>{
        const query = "select * from course";
        db.query(query,(err,result)=>{
            if (err) {
                console.error("Get all courses error : ",err);
                return res.status(400).json({success : false, message: err.message});
            } else{
                console.log("Fetthed all courses successfully : ",result);
                return res.status(200).json({success : true, message : "Fetched all courses successfully", data : result});
            }
        })
    }
}

module.exports = CourseController;
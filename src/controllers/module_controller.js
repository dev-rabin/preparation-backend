const db = require("../connection");

const ModuleController = {
    createModule : (req,res) => {
        const {courseId,module_name,number} = req.body;
        const query = "insert into module (courseId,module_name,number) values (?,?,?)";
        db.query(query,[courseId,module_name,number],(err,result)=>{
            if (err) {
                console.error("Create module error : ", err);
                return res.status(400).json({success: false, message : err.message})
            }else{
                console.log("Module created successfully !",result);
                return res.status(200).json({success:true,message:"Module created successfully",id:result.insertId});
            }
        })
    },
    getModuleByCourseId : (req,res) => {
        const {courseId} = req.params;
        const query = `SELECT module.*, course.*
        FROM module
        INNER JOIN course ON module.courseId = course.course_id
        WHERE module.courseId = ?`;
        console.log("getModuleByCourseId courseId : ",courseId);
        db.query(query,courseId,(err,result)=>{
            if (err) {
                console.error("getModuleByCourseId error : ",err);
                return res.status(400).json({success:false,message:err.message});
            }else{
                console.log("get module by course id successfully",result);
                return res.status(200).json({success:true,message:"Module fetched successfully",data:result});
            }
        })
    }
}

module.exports = ModuleController;
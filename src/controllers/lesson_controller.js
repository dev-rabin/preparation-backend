const db = require("../connection");
const multer = require("multer");

const lessonVideoConfig = multer.diskStorage({
    destination : (req,file,callBack) => {
        callBack(null,"./uploads/videos");
    },filename : (req,file,callBack)=>{
        callBack(null,`video-${Date.now()}.${file.originalname}`);
    }
});

const uploads = multer({
    storage : lessonVideoConfig
})

const LessonController = {
    createLesson : (req, res)=>{
        const {module_id,name,number,lesson_details,course_order} = req.body;
        const video_url = req.file ? req.file.path : null;
        const query = "insert into lesson (module_id,name,number,video_url,lesson_details,course_order) values (?,?,?,?,?,?)";
        db.query(query,[module_id,name,number,video_url,lesson_details,course_order],(err,result)=>{
            if (err) {
                console.error("createLesson error : ",err);
                return res.status(400).json({success:false,message:err.message})
            }else {
                console.log("createLesson successfully");
                return res.status(200).json({success:true,message:"Lesson created succeefully",id:result.insertId})
            }
        });
    },
    getLessonByModuleId : (req,res) =>{
        const {module_id} = req.params;
        const query = "select * from lesson where module_id = ?";
        db.query(query,module_id,(err,result)=>{
            if (err) {
                console.error("getLessonByModuleId error : ",err);
                return res.status(400).json({success:false,message:err.message})
            }else {
                console.log("createLesson successfully");
                return res.status(200).json({success:true,message:"Lesson fetched succeefully",data:result})
            }
        })
    }
}

module.exports ={ LessonController,uploads};
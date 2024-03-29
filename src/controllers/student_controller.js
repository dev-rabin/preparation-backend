const db = require("../connection");
const bcrypt = require("bcrypt");
const saltRounds = 6;
const generateToken = require('../middleware/generateToken');
const jwt = require("jsonwebtoken");

const StudentController = {
    studentRegistration: (req, res) => {
        const { name, email, profile, password } = req.body;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                console.error("Error generating salt", err);
                return res.status(400).json({ success: false, message: "Error creating user" });
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.error("Error hashing password", err);
                    return res.status(400).json({ success: false, message: "Error creating user" });
                }

                const query = "INSERT INTO student (name, email, profile, password) VALUES (?, ?, ?, ?)";
                db.query(query, [name, email, profile, hash], (err, result) => {
                    if (err) {
                        console.error("student registration error: ", err);
                        return res.status(400).json({ success: false, message: err.message });
                    } else {
                        const token = generateToken(result.student_id,result.name);
                        console.log("Register Generated token : ", token);
                        return res.status(200).json({ success: true, message: "student registration successful", token: token });
                    }
                });
            });
        });
    },

    studentLogin: (req, res) => {
        const { email, password } = req.body;
        const query = "SELECT * FROM student WHERE email = ?";
        db.query(query, [email], (err, result) => {
            if (err) {
                console.error("student login error: ", err);
                return res.status(400).json({ success: false, message: err.message });
            }

            if (result.length === 0) {
                console.error("student not found");
                return res.status(401).json({ success: false, message: "Student not found" });
            }

            const student = result[0];
            bcrypt.compare(password, student.password, (err, passwordMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ success: false, message: 'Internal server error' });
                }

                if (!passwordMatch) {
                    return res.status(401).json({ success: false, message: 'Invalid password' });
                }
                const student = result[0];
                const token = generateToken(student.student_id, student.name);
                console.log("Login generated token : ", token);
                return res.status(200).json({ success: true, message: "Login successful", token: token, data: result});
            });
        });
    },
    getStudentByToken : (req, res) => {
        const payload = jwt.decode(req.headers.authorization);
        const student_id = payload.student_id;
        console.log("Payload student_id : ", student_id);
        const query = "select student_id,name,email,profile from student where student_id = ?";
        db.query(query,student_id,(err,result)=> {
            if (err) {
                console.error(err);
                res.json({success : false ,message : err})
              }
              if (result.length === 0) {
                res.json({message : "Student not found"});
              }
              else {
                const studentData = result[0];
                console.log("getUserByToken studentData : " , studentData);
                 res.json({
                   success : true,
                   message : "Student Data get",
                   studentData : studentData
                 })
               }
        })
    }
};

module.exports = StudentController;

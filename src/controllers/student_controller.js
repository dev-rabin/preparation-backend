const db = require("../connection");
const bcrypt = require("bcrypt");
const saltRounds = 6;

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
                        console.log("student registration successful", result);
                        return res.status(200).json({ success: true, message: "student registration successful", data: result ,id : result.insertId});
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

                console.log("Login successful", result);
                return res.status(200).json({ success: true, message: "Login successful", data: result });
            });
        });
    }
};

module.exports = StudentController;

const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_KEY;

const generateToken = (student_id,name) => {
    const payload = {
        student_id : student_id,
        name : name
    }
    const options = {
        expiresIn : "30d"
    };

   return jwt.sign(payload,secretKey,options);
}

module.exports = generateToken;
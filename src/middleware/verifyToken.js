const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_KEY;

const verifyToken = (req,res,next) => {
   const token = req.headers.authorization;
   console.log("Verify token : ", token);

   if (!token) {
    console.log("Token not provided");
    return res.status(401).json({succeess : false, message : "Token not provided"});
   }

   jwt.verify(token,secretKey,(err,decoded)=>{
    if (err) {
        console.log("token verification failed! : ",err);
        return res.status(401).json({succeess : false, message : err.message});
    }
    console.log("Decoded token : ", decoded);
    next();
   })
}

module.exports = verifyToken;
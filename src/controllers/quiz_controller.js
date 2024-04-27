const db = require("../connection");

const QuizController = {

    createQuiz : (req,res)=>{
        const {quiz_name,quiz_description} = req.body;
        const query = "insert into quizzes (quiz_name,quiz_description) values (?,?)";
        db.query(query,[quiz_name,quiz_description],(err,result) => {
            if (err) {
                console.error("Error during quiz creation");
                return res.status(400).json({success : false,message: err.message});
            } else {
                console.log("Quiz creation result : ",result);
                return res.status(200).json({success : true, message : "Quiz created successfully", id:result.insertId});
            }
        })
    },
    quizQuestions : (req,res) =>{
        const {quiz_id,question_text,question_type} = req.body;
        const query = "insert into quiz_questions (quiz_id,question_text,question_type) values (?,?,?)";
        db.query(query,[quiz_id,question_text,question_type],(err,result)=>{
            if (err) {
                console.error("Error during quiz questions creation");
                return res.status(400).json({success : false,message: err.message});
            } else {
                console.log("Quiz questions creation result : ",result);
                return res.status(200).json({success : true, message : "Quiz questions created successfully", id:result.insertId});
            }
        })
    },
    qustionOptions : (req,res) =>{
        const {question_id,option_text,is_correct_option} = req.body;
        const query = "insert into question_options (question_id,option_text,is_correct_option) values (?,?,?)";
        db.query(query,[question_id,option_text,is_correct_option],(err,result) => {
            if (err) {
                console.error("Error during question options creation");
                return res.status(400).json({success : false,message: err.message});
            } else {
                console.log("question options creation result : ",result);
                return res.status(200).json({success : true, message : "question options created successfully", id:result.insertId});
            }
        })
    },
    fetchQuiz : (req,res) =>{
        const query = "SELECT * from quizzes;"
        db.query(query,(err,result)=>{
            if (err) {
                console.error("Error during fetching quiz");
                return res.status(400).json({success : false,message: err.message});
            }else {
                console.log("Fetched quiz successfully : ",result);
                return res.status(200).json({success : true, message : "Fetched quiz successfully", data : result});
            }
        })
    },
    // fetchQuizQuestionsbyQuizId : (req,res) =>{
    //     const quiz_id = req.params;
    //     const query = "select * from quiz_questions where quiz_id = ?"
    //     // const query = "SELECT * FROM `preparation-db`.quiz_questions join question_options on question_options.question_id = quiz_questions.question_id;"
    //     db.query(query,quiz_id,(err,result)=>{
    //         if (err) {
    //             console.error("Error during fetchQuizQuestionsbyQuizId : ",err);
    //             return res.status(400).json({success : false, message : err.message});
    //         } else{
    //             console.log("fetchQuizQuestionsbyQuizId successfully : ",result);
    //             return res.status(200).json({success : true, message : "Fetched qustions successfully", data : result});
    //         }
    //     })
    // },
    // // fetchOptionsByQuestionId : (req,res) =>{
    // //     const question_id = req.params.question_id;
    // //     console.log("question_id : ",question_id);
    // //     const query = "select * from question_options where question_id = ?";
    // //     db.query(query,question_id,(err,result)=>{
    // //         if (err) {
    // //             console.error("Error during fetchOptionsByQuestionId : ",err);
    // //             return res.status(400).json({success : false, message : err.message});
    // //         }else{
    // //             console.log("fetchOptionsByQuestionId successfully : ",result);
    // //             return res.status(200).json({success : true, message : "Fetched qustion options successfully", data : result});
    // //         }
    // //     })
    // // }
    fetchQuestionsWithOptions: (req, res) => {
        const quiz_id = req.params.quiz_id;
        const query = `
            SELECT quiz_questions.question_text, 
                   question_options.option_id, question_options.option_text, question_options.is_correct_option
            FROM quiz_questions
            LEFT JOIN question_options ON quiz_questions.question_id = question_options.question_id
            WHERE quiz_questions.quiz_id = ?
        `;
        db.query(query, [quiz_id], (err, result) => {
            if (err) {
                console.error("Error during fetchQuestionsWithOptions: ", err);
                return res.status(400).json({ success: false, message: err.message });
            } else {
                console.log("fetchQuestionsWithOptions successfully: ", result);
                const questionsWithOptions = [];
                let currentQuestion = null;
                result.forEach(row => {
                    const { question_text, option_id, option_text, is_correct_option } = row;
                    if (!currentQuestion || currentQuestion.question_text !== question_text) {
                        currentQuestion = { question_text, options: [] };
                        questionsWithOptions.push(currentQuestion);
                    }
                    currentQuestion.options.push({ option_id, option_text, is_correct_option });
                });
                return res.status(200).json({ success: true, message: "Fetched questions with options successfully", data: questionsWithOptions });
            }
        });
    }
}

module.exports = QuizController;
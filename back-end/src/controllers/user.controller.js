const express = require("express");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const app = express();


// const { append } = require("express/lib/response");
const User = require("../models/user.model");
const router = express.Router();
const protect = require("../middlewares/protect");

// app.use(express.json());

// app.use(cors());

router.get("/",protect, async(req, res) =>{
    // console.log("req user",await req.user)

    const users = await User.find({}).select('-password').lean().exec();

    return res.status(200).json({data: users});
});

// let token;

// app.post("/signup",protect, async(req, res) =>{
//     // console.log("req user",await req.user)

//     let email = req.body.email;
//     let response1 = await User.findOne({email});

//     if(response1){
//         token = jwt.getToken(response1.email);
//         res.send(token, response1);
//     }else{
//         token = jwt.getToken(response1.email);
//         let userData = {
//             email:req.body.email,
//             password: req.body.password, 
//             username: req.body.username
//         }
//         let response1 = await User.insertMany([userData]);
//         res.send(response1, token);
//     }
// });


// app.post("/signin", protect, async(req, res) =>{
//     // console.log("req user",await req.user)

//     let userData = {
//         email : req.body.email,
//         password : req.body.password
//     }

//     let email = req.body.email;
//     let response1 = await User.findOne({email});

//     if(response1 && response1.password == req.body.password){
//         token = jwt.getToken(response1.email);
//         res.status(200).json(token);
//     }else{
        
//         res.status(403).json({
//             status : false,
//             message : "Invalid credentials"
//         });
//     }
// });

module.exports = router;



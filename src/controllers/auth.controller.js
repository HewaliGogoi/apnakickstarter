const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model")

const newToken = (user)=>{
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
};

const signup = async (req,res) =>{
    
    try {
        const user = await User.create(req.body) 
        const token = newToken(user);
        return res.status(201).json({data : {token}, user : {user} });
        
    } catch (e) {
        return res
        .status(500)
        .json(e);
    }
};


// const signin = async(req, res) => {

//   console.log(1);

//     try {
//         // we will try to find the user with the email provided
//         const user = await User.findOne({ email: req.body.email });
//         console.log(user);
//         // If user is not found then return error
//         if (!user)
//           return res
//             .status(400)
//             .send({ message: "Please try another email or password" });
    
//         // if user is found then we will match the passwords
//         const match = user.checkPassword(req.body.password);
    
//         if (!match)
//           return res
//             .status(400)
//             .send({ message: "Please try another email or password" });
    
//         // then we will create the token for that user
//         const token = newToken(user);
    
//         // then return the user and the token
//         res.send({ user, token });
//       } catch (err) {
//         res.status(500).send(err.message);
//       }
// }

const signin = async (req,res) =>{
    //  we will find the user with the email address
    let user;
    try {
        user = await User.findOne({email: req.body.email}).exec();
        // console.log(user)

        if(!user)
        return res
        .status(401)
        .json({
            status:"failed",
            message: "Your email or password is not correct",
        });
    } catch (e) {
        return res.status(500).json({status: "failed", message: "Something went wrong"});
    }

    
    try {
     // we will try to match password the user has with the password stored in the system
      const match = await user.checkPassword(req.body.password);
      
      if(!match) return res
        .status(401)
        .json({
            status:"failed",
            message: "Your email or password is not correct",
        });
    } catch (e) {
        return res.status(500).json({status: "failed", message: "Something went wrong"});
        
    }

//create a new token and return it
   const token = newToken(user);
   return res.status(200).json({data:{token}});

};

module.exports = {
     signup,
     signin,
};
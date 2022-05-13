// first we need to get a token
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = (token) =>{
   return new Promise((resolve, reject) =>{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) =>{
            if(err) return reject(err);

            return resolve(payload);
        });
    });
};

const protect = async(req, res, next) => {
     const bearer = req.headers.authorization;

     if(!bearer || !bearer.startsWith("Bearer "))
     return res
        .status(401)
        .json({
            status:"failed",
            message: "Your email or password is not correct",
        });

        // we need to verify the token
        const token = bearer.split("Bearer ")[1].trim();
        console.log("token" ,token);

        // retrieve the user and if user exists then good else bad token
        let payload;
        try {
            payload = await verifyToken(token);
        } catch (e) {
            return res
                .status(401)
                .json({
                    status:"failed",
                    message: "Your email or password is not correct",
                });
        }

        let user;
        try {
            user = User.findById(payload.id).lean().exec();
        } catch (e) {
            return res
            .status(500)
            .json({
                status:"failed",
                message: "Something went wrong",
            });
        }

        if(!user){
            return res
            .status(401)
            .json({
                status:"failed",
                message: "Your email or password is not correct",
            });
        }

        req.user = user;
        next();
};

module.exports = protect;
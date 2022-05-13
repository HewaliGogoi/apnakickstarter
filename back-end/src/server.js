const express = require("express");
// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
const cors = require("cors");
let port = 2244;

const connect = require("./config/db");

const app = express();


const {signup, signin} = require("./controllers/auth.controller")
const userController = require("./controllers/user.controller");


//------------------------------------------------------------------

const projectController = require("./controllers/project.controller");

//------------------------------------------------------------------

app.use(express.json());
app.use(cors());
app.post("/signup", signup);
app.post("/signin", signin);

app.use("/users", userController);
// app.use("/products", productController);
// app.use(passport.initialize());


app.use("/projects", projectController);

//------------------------------------------------------------------

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// });

// passport.use(new FacebookStrategy({
//     clientID: process.env.CLIENT_ID_FB,
//     clientSecret: process.env.CLIENT_KICKSTARTER_FB,
//     callbackURL: "http://localhost:2244/auth/facebook/secrets"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// const start = async() => {
//   try {
//     await connect();
//     // console.log(1);
//     app.listen(process.env.PORT || port, () =>{
//         console.log("Listening on port 2244...");
//     });
    
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };



const start = async() => {
  await connect();
  // console.log(1);
  app.listen(2244, () =>{
    console.log("Listening on port 2244...");
  })
};
module.exports = start;

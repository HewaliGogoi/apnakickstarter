require("dotenv").config();
const passport = require("./config/passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("../models/user.model");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2244/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

      return cb(null, "user");

    
  }
));

module.exports = passport;
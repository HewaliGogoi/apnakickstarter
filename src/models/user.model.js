const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, minlength: 8 },
      // facebookId : String
    },
    {
      timestamps: true,
    }
  );



  userSchema.pre("save", function(next){
    if(!this.isModified("password")) return next();
  
    bcrypt.hash(this.password, 8, (err, hash)=>{
      if (err) return next(err);

      this.password = hash;
      next();
    })
});

      // if (!this.isModified("password")) return next();

      // // secret , salt => sdkfhsdkfh , secret + sdkfhsdkfh => dskfgkcskdfgsdkfsdf
      // // salt
      // // hashing rounds =>
      // var hash = bcrypt.hashSync(this.password, 8);
      // this.password = hash;
      // return next();


      userSchema.methods.checkPassword = function (password){
        const passwordHash = this.password;
        return new Promise((resolve, reject) =>{
            bcrypt.compare(password, passwordHash, (err, same) =>{
                if(err) return reject(err);
                resolve(same);
            });
        });
    };
  

  const User = mongoose.model("user", userSchema);
 
  module.exports = User;
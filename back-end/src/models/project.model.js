const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    id : {type : String, required: true},
    image : {type : String, required: true},
    vedio : {type : String},
    title : {type : String, required: true},
    subtitle : {type : String, required: true},
    author : {type : String, required: true},
    fund : {type : Number, required: true},
    goal : {type : Number, reuired: false},
});

module.exports = mongoose.model("project", projectSchema);
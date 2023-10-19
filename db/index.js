const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true, required: true },
    password: String,
});

const noteschema = new mongoose.Schema({
    userid : String,
    title : String,
    link:String,
    description:String,
    color: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Note = mongoose.model("Note" , noteschema);

const User = mongoose.model("User" , userschema);
module.exports = {  User,Note };
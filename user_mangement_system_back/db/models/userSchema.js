const mongoose = require('mongoose')
const bcrypt = require('bcrypt'),
Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

// User Schema Or Document Structure

const userSchema = new Schema({

    username : {
        type : String,
        required : true,
        unique : true
    } ,
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
        trim: true
    },
    password : {
        type : String,
        required : true
    }, 

    created: {
        type: Date,
        default: Date.now
    }
})

// Create Model


const users = new mongoose.model("user",userSchema)

module.exports = users


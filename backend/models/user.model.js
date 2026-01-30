const mongoose =require('mongoose');
const validator = require('validator');
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        minLength: [3, 'Your name must be at least 4 characters'],
        },

    email:{
        type:String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate:[validator.isEmail, 'Please enter a valid email address']
},

    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be at least 6 characters'],
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    otp:String,
    otpExpires:Date,
},
{timestamps:true}
);

module.exports = mongoose.model("User", userSchema);
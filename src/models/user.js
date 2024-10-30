const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        trim: true,
    }, 
    lastName: {
        type: String, 
        maxLength: 25,
        trim: true,
    },
    gender : {
        type: String,
        lowercase: true,
        trim: true,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Oops!...wrong input");
            }
        },
    },
    photoURL: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("incorrect profile url: " + value)
            }
        }
    },   
    skills: {
        type: [String],

    },
    experience: {
        type: Number,
        min: 0,
    },
    about: {
        type: String,
        default: "Let'us know about yourself.",
    },
    emailId: {
        type: String, 
        required: true,
        maxLength: 255,
        lowercase: true,
        trim: true,
        unique: true,
        immutable: true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Incorrect Email: " + value );
            }
        }
    },
    password: {
        type: String, 
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a strong Password: " + value)
            }
        }
    },
    isEditOnceAllowed: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true});


userSchema.methods.getJWT = async function(){
    // creating JWT token
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevTinder@98$", { expiresIn: '1h' });

    return token;
}


userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}


module.exports = mongoose.model('User', userSchema);
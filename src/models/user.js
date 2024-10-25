const mongoose = require('mongoose');
const validator = require('validator');

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
    experience: {
        type: Number,
        min: 0,
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
    photoURL: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("incorrect profile url: " + value)
            }
        }
    },
    about: {
        type: String,
        default: "Let'us know about yourself.",
    }, 
    skills: {
        type: [String],

    }
}, { timestamps: true});

module.exports = mongoose.model('User', userSchema);
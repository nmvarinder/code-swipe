const validator = require('validator');

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!(firstName || lastName)){
        throw new Error("Name is not valid");
    } else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    } else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
    }
}

const validateEditField = (req) => {
    const allowedEditField = ["photoURL", "skills", "experience", "about"];

    const isAllowedEditField = Object.keys(req.body).every((key) => allowedEditField.includes(key));

    return isAllowedEditField;
}

const validateFieldOnce = (req) => {
    const allowedEditFieldOnce = ["firstName", "lastName", "gender"];

    const isAllowedEditFieldOnce = Object.keys(req.body).every((key) => allowedEditFieldOnce.includes(key));

    return isAllowedEditFieldOnce;
}


module.exports = {
    validateSignupData,
    validateEditField,
    validateFieldOnce,
}
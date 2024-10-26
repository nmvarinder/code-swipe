const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req,res,next) => {
    try{
        const {token} = req.cookies;

        const decodedToken = jwt.verify(token, "DevTinder@98$");
        const user = await User.findById({_id:decodedToken._id});

        if(!user){
            throw new Error("Invalid Credentials");
        }
        req.user = user;
        next();
    } catch(err){
        res.status(400).send(err.message);
    }
    
};

module.exports = {userAuth};
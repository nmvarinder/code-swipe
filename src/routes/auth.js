const express = require('express');
const {validateSignupData} = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authRouter = express.Router();

/* POST API */
//signup
authRouter.post('/signup', async (req, res) => {
    try{
        //validating
        validateSignupData(req);

        //getting field
        const {firstName, lastName, emailId, password} = req.body;

        // encrypting password
        const passwordHash = await bcrypt.hash(password, 10);

        // ready field of api after checking validation for storing in db
        const user = new User({
            firstName, 
            lastName, 
            emailId,
            password: passwordHash,
        })
        
        // ready and save into db
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send('Error saving the user: ' + err.message);
    }
})

//login
authRouter.post('/login', async (req, res) => {
    try{
        const {emailId, password} = req.body;

        //checking user email id present in db or not
        const userData = await User.findOne({emailId});

        if(!userData){
            throw new Error("user Doesn't exist");
        }

        //schema method: comparing password with stored hash password
        const isPasswordValid = await userData.validatePassword(password);
        //data send: user login
        if(!isPasswordValid){
            throw new Error("Oops!...password incorrect")
        } else {
            
            const token = await userData.getJWT();
            
            //sending token to user and access to login
            res.cookie("token", token, {expires: new Date(Date.now() + 60 * 60 * 1000)});
            res.send("user login successfully!!!")
        }
    } catch(err) {
        res.status(404).send(err.message);
    }

})

//logout
authRouter.post('/logout', (req, res) => {
    res.cookie("token", null,{
        expires: new Date(Date.now())
    });
    res.send("logout")
})

module.exports = authRouter;
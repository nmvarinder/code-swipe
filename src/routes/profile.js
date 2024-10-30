const express = require('express');
const {userAuth} = require('../middleware/auth');
const {validateEditField, validateFieldOnce} = require('../utils/validation');

const profileRouter = express.Router();


//profile : code can be refine here
profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    } catch(err) {
        res.status(404).send("something wrong valid");
    }
})

//profile: edit
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try{
        if(!validateEditField(req)){
            throw new Error("edit field not allowed");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key]
        });

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser,
        });


    } catch(err){
        res.status(404).send(err.message);
    }
})

//profile: edit-name(only once)
profileRouter.patch('/profile/editOnce', userAuth, async (req, res) => {
    try{
        if(!validateFieldOnce(req)){
            throw new Error("edit not Allowed");
        }
        const loggedInUser = req.user;

        const {isEditOnceAllowed} = loggedInUser;
        if(!isEditOnceAllowed){
            throw new Error("Attempt exceeds limit");
        }

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key]
        });
        loggedInUser.isEditOnceAllowed = false;

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser,
        });


    } catch(err){
        res.status(400).send(err.message);
    }    
}) 


module.exports = profileRouter;
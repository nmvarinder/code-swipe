const express = require('express');
const {userAuth} = require('../middleware/auth');

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


module.exports = profileRouter;
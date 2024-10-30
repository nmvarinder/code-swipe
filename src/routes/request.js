const express = require('express');
const {userAuth} = require('../middleware/auth');

const requestRouter = express.Router();

// request sending
requestRouter.post('/sendConnectionRequest', userAuth, (req, res) => {
    try{
        res.send("requested send by: " + req.user.firstName);
    } catch(err) {
        res.status(404).send("something wrong valid");
    }
})

module.exports = requestRouter;
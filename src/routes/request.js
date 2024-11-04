const express = require('express');
const {userAuth} = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const requestRouter = express.Router();

// - POST /request/send/:status/:toUserId
requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try{
        const status = req.params.status;
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus){
            return res.status(400).json({
                message: "INVALID status type" + status,
            })
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            res.status(404).json({message: "User not found!"});
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ],
        });
        if(existingConnectionRequest){
            res.status(400).json({message: "connection request already exists"})
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save();

        res.json({
            message: status + " send by: " + req.user.firstName + " to " + toUser.firstName,
            data 
        });

    } catch(err){
        res.status(400).send(err.message);
    }
})


module.exports = requestRouter;
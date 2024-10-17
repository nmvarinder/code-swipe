const express = require('express');
const connectDB = require('./config/database')
const User = require('./models/user');
const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    console.log("adding data to devTinder DB");

    // console.log(req.body);

    const user = new User(req.body)

    try{
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send('Error saving the user: ' + err.message);
    }

})


// get single user
app.get('/users', async (req, res) => {
    console.log(req.body.emailId);
    const userEmail = req.body.emailId;

    const user = await User.findOne({emailId: userEmail});

    try{
        if(user){
            res.send(user);
        } else {
            res.send("user not found");
        }
    } catch(err) {
        res.status(404).send("something went wrong");
    }

})

// get all the user for feed
app.get('/feed', async (req, res) => {
    const user = await User.find({});

    try{
        if(user){
            res.send(user);
        } else {
            res.send("user not found");
        }
    } catch(err) {
        res.status(404).send("something went wrong!");
    }
})


connectDB().then(() => {
    console.log("Database connection established.")
    app.listen(3000, () => {
        console.log("server is successfully listening of port number: 3000");
    });
}).catch((err) => {
    console.error("Database cannot connected!")
})




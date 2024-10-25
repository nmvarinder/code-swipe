const express = require('express');
const connectDB = require('./config/database')
const User = require('./models/user');
const app = express();
const {validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');
app.use(express.json());

/* POST API */
app.post('/signup', async (req, res) => {
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

/* GET API */
// get single user
app.get('/user', async (req, res) => {
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

/* DELETE API */
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id: userId});
        res.send("user deleted successfully")
    } catch(err) {
        res.status(404).send("something went wrong!");
    }
})


/* UPDATE API */
// using patch
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    console.log(userId);

    try{
        const ALLOWED_UPDATE = ["photoURL", "gender", "experience", "password", "about", "skills"];

        const isUpdateAllowed = Object.keys(data).every((k) => {
            ALLOWED_UPDATE.includes(k);
        })
    
        if(!isUpdateAllowed){
            
        }

        if(data?.skills.length > 4){
            throw new Error("skiils not exceeded by 4");
        }

        await User.findByIdAndUpdate({_id: userId}, data, {runValidators:true});
        res.send("user updated successfully");
    } catch(err) {
        res.status(404).send("something went wrong!" + err);
    }
})
// using put
app.put('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
        await User.findByIdAndUpdate({_id: userId}, data);
        res.send("user updated successfully");
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




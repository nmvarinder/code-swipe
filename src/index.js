const express = require('express');
const connectDB = require('./config/database')
const User = require('./models/user');
const app = express();
const {validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const {userAuth} = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const user = require('./models/user');


app.use(express.json());
app.use(cookieParser());

/* POST API */
//signup
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

//login
app.post('/login', async (req, res) => {
    try{
        const {emailId, password} = req.body;

        //checking user email id present in db or not
        const userData = await User.findOne({emailId});

        if(!userData){
            throw new Error("user Doesn't exist");
        }

        //comparing password with stored hash password
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        //data send: user login
        if(!isPasswordValid){
            throw new Error("Oops!...password incorrect")
        } else {
            // creating JWT token
            const token = jwt.sign({_id: userData._id}, "DevTinder@98$", { expiresIn: '1h' });

            //sending token to user and access to login
            res.cookie("token", token, {expires: new Date(Date.now() + 60 * 1000)});
            res.send("user login successfully!!!")
        }
    } catch(err) {
        res.status(404).send(err.message);
    }

})

// request sending
app.post('/sendConnectionRequest', userAuth, (req, res) => {
    try{
        res.send("requested send by: " + req.user.firstName);
    } catch(err) {
        res.status(404).send("something wrong valid");
    }
})

//profile : code can be refine here
app.get('/profile', userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    } catch(err) {
        res.status(404).send("something wrong valid");
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




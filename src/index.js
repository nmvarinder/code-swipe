const express = require('express');
const connectDB = require('./config/database')
const User = require('./models/user');
const app = express();

app.post('/signup', async (req, res) => {
    console.log("adding data to devTinder DB");

    const user = new User({
        firstName: 'kishore', 
        lastName: 'kumar',
        gender: 'male',
        experience: 3,
        emailId: 'kishore@kumar.com',
        password: 'kishor@123s',
        
    })

    try{
        await user.save();
        res.send("User added successfully");
    } catch(err){
        res.status(400).send('Error saving the user: ' + err.message);
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




const express = require('express');
const app = express();

// app.get here alone expose code to the browser
app.get('/users/getInfo', (req, res) => {
    console.log("managing error handling")
    throw new Error("custom error");
    res.send("use data sent");
})

// from avoid exposing to the browser we use another error handler middleware router handler or also we can use try and catch in above route handlers
// best error handling is try and catch

app.use('/', (err, req, res, next) => {
    if(err){
        console.log(err);
        res.status(500).send("something went wrong");
    }
})


app.listen(3000, () => {
    console.log("server is successfully listening of port number: 3000");
});

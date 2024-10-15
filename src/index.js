const express = require('express');

const app = express();


/* // use method handle all type of http request, so any scenario of request weather its get, put, post, delete and others. use will works
// better to avoid use method
app.use('/users', (req,res) => {
    res.send("jadu jo glt hai");
}) */

app.get('/', (req,res) => {
    res.send("testing")
})

app.get('/users', (req,res) => {
    res.send("testing ordering in get method");
})

app.get('/users/:userId', (req,res) => {
    console.log(req.query);
    console.log(req.params);
    res.send({ firstName: "varinder", lastName: "chauhan"});
})


app.post('/users', (req,res) => {
    res.send("data stored in db: successfully")
})


app.delete('/users', (req,res) => {
    res.send("data deleted")
})


app.listen(3000, () => {
    console.log("server is successfully listening of port number: 3000");
});

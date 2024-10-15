const express = require('express');

const app = express();

app.use("/hello", (req, res) => {
    res.send("hello world, welcome");
})

app.use("/", (req, res) => {
    res.send("first page"); 
})

app.use("/test", (req, res) => {
    res.send("hello from the server");
})

app.listen(3000, () => {
    console.log("server is successfully listening of port number: 3000");
});

const express = require('express');

const app = express();

// doing practice: by toggling a to resp. handler response
let a = true;

app.use('/users', (req, res, next) => {
    console.log("handling 1st callback of users router")
    console.log("before req send")
    next();
    if(a == true){
        res.send("1st response!!");
    }
    console.log("after req send");
},(req, res) => {
    console.log("handling 2nd callback of users router");
    if(a == true){
        a = false;
        res.send("2nd response!!");
    }
});

console.log("outside")



app.listen(3000, () => {
    console.log("server is successfully listening of port number: 3000");
});

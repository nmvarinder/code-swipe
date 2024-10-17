const express = require('express');
const {authAdmin, authUser} = require("../middleware/authorization")

const app = express();

//good way of managing middleware
app.use("/admin", authAdmin)

app.get("/admin/getAllData", (req, res, next) => {
    res.send("get All Data");
})

app.get("/admin/deleteAllData", (req, res, next) => {
    res.send("delete All Data");
})

app.get("/user", authUser, (req, res, next) => {
    res.send("user here");
})

app.listen(3000, () => {
    console.log("server is successfully listening of port number: 3000");
});

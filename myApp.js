require('dotenv').config();
let express = require('express');
let app = express();


app.use(function(req, res, next) { 
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "HELLO JSON"});
        return;
    }
    res.json({"message": "Hello json"});
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, (req, res )=> {
    res.json({"time": req.time});
})

app.get("/:word/echo", (req, res) => {
    res.json({"echo": req.params.word});
});

app.get("/name", (req, res) => {
    let first = req.query.first;
    let last = req.query.last;

    if (first && last) {
        res.json({"name": `${first} ${last}`});
    } else {
        res.status(400).json({"error": "Firstname and last are required."});
    }
});

module.exports = app;

// REQUIRE DEPENDENCIES
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// PORT SETUP
var PORT = process.env.PORT || 3000;

// INITIATE EXPRESS
var app = express();

// ROUTES SETUP
var router = express.Router();
require("./config/routes")(router);
app.use(express.static(__dirname + "/public"));

// HANDLEBARS SETUP
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// BODYPARSER SETUP
app.use(bodyParser.urlencoded({
    extended: false
}));

// USE ROUTER
app.use(router);

// MONGO SETUP
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection is successful");
    }
});

// LISTEN ON PORT
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});
const express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
var exphbs = require("express-handlebars");
const db = require("./models");


//Create server app and set port
let server = express();
const PORT = process.env.PORT || 8080;

//Add everything the server will use
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.engine("handlebars", exphbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

server.use(session({ secret: "awd728%%4;", resave: true, saveUninitialized: true }));
server.use(passport.initialize());
server.use(passport.session());


//Routes
require("./routes/htmlroutes")(server);
require("./routes/authRoutes")(server, passport);


db.sequelize.sync().then( () => {
    server.listen(PORT, () => {
        console.log(`Listening in port: ${PORT}`);
    });
});

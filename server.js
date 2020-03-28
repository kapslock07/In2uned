const express = require("express");
var exphbs = require("express-handlebars");

require("dotenv").config();


//Create server app and set port
let server = express();
const PORT = process.env.PORT || 8080;

//Add everything the server will use
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.engine("handlebars", exphbs({ defaultLayout: "main" }));
server.set("view engine", "handlebars");


//Routes





server.listen(PORT, (err) => {
    if(err)throw err;

    console.log(`Listening in port: ${PORT}`);
});



require("dotenv").config();
const db = require("../models");
let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (server) {


    server.get("/", (req, res) => {
        res.render("login", {layout: "loginLayout.handlebars"});
    });

    server.get("/feed", isAuthenticated, (req, res) => {
        db.Review.findAll({
            include: [db.User]
        }).then(data => {
            res.render("feed", {
                reviews: buildObjectFromDB(data)
            });
        });  
    });

    server.get("/myreviews", isAuthenticated, (req, res) => {
        let object = {
            reviews: [
                { review_name: "Wish You Were Here", rating: 5, review_text: "dfhjajdshfadsfjksadhfdasjlkfhdasljkfhdskjfhadsljkfdha" },
            ],
            username: "Ryan"
        };
        res.render("myreviews", object);
    });

    buildObjectFromDB = (dbDat) => { //This function explcitly creates an array of objects from DB data that Handlebars will understand
        let newObj = [];
         dbDat.forEach(e => {
            let data = e.dataValues;

            newObj.push({
                review_name: data.review_name,
                rating: data.rating,
                user_name: data.User.user_name,
                review_text: data.review_text
            });
        });
        return newObj;
    }


}
require("dotenv").config();
const axios = require("axios");
const qs = require('qs')
const db = require("../models");

module.exports = function (server) {


    server.get("/", (req, res) => {
        res.render("login");
    });

    server.get("/feed", (req, res) => {
        let object = {
            reviews: [
                { username: "Ryan", review_name: "Althea", rating: 5, review_text: "dfhjajdshfadsfjksadhfdasjlkfhdasljkfhdskjfhadsljkf" },
                { username: "Christopher", review_name: "Stairway to Heaven", rating: 4, review_text: "eJKFHDASLJKHFLJKSDAHFLJKADSHFLADSJKHF" },
                { username: "Nicholas", review_name: "Moonage Daydream", rating: 3, review_text: "sdjlfhdasjkhfdsajhfadsjkhflsadjkfgijasd" },
                { username: "Corey", review_name: "Pale Blue Eyes", rating: 2, review_text: "asdghfjkldgsahfjkgasdfhjdsagfkhj" }
            ],
            username: "ryan"
        };

        db.Review.findAll({
            include: [db.User]
        }).then(data => {
            res.render("feed", data);
        });


        
    });

    server.get("/myreviews", (req, res) => {
        let object = {
            reviews: [
                { review_name: "Wish You Were Here", rating: 5, review_text: "dfhjajdshfadsfjksadhfdasjlkfhdasljkfhdskjfhadsljkfdha" },
            ],
            username: "Ryan"
        };
        res.render("myreviews", object);
    });




    server.get("/logout", (req, res) => {
        let object = {

            logout: "Where the hell are you going?"
        };
        res.render("logout", object);
    });


}
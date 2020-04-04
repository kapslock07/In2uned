require("dotenv").config();
const db = require("../models");
let isAuthenticated = require("../config/middleware/isAuthenticated");
let axios = require("axios");

module.exports = function (server) {

    server.get("/", (req, res) => {

        res.render("login", { layout: "loginLayout.handlebars" });
    });

    server.get("/feed", isAuthenticated, (req, res) => {
        console.log(req.session.passport.user);
        db.Review.findAll({
            include: [db.User]
        }).then(data => {
            res.render("feed", {
                reviews: buildObjectFromDB(data)
            });
        });
    });

    server.get("/myreviews", isAuthenticated, (req, res) => { //if there is a user it gets there id and retrieves there reviews
        if (!req.user) {
            res.json({});
        }
        else {
            let id = req.user.id;

            db.Review.findAll({
                where: {
                    UserId: id
                }
            }).then(reviews => {
                res.render("myreviews", {
                    reviews: reviews
                });
            });
        }
    });

    server.get("/search", isAuthenticated, (req,res) => {
        res.render("search");
    })

    server.post("/search", isAuthenticated, (req,res)=> {
        let query = req.body.query;

        let queryURL = `https://api.spotify.com/v1/search?q=${query}&type=track`;

        console.log(req.user);

        axios.get(queryURL, { headers: { Authorization: `Bearer ${req.user.access_token}`} }
        ).then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('error' + error);
        });
    });

    server.post("/myreviews", isAuthenticated, (req, res) => { 

    });

    refreshAccessToken = (dbUser, res) => {

    }

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
require("dotenv").config();
const db = require("../models");
let isAuthenticated = require("../config/middleware/isAuthenticated");
let axios = require("axios");
const qs = require('qs');
const sequelize = require("sequelize");


module.exports = function (server) {

    server.get("/", (req, res) => {
        res.render("login", { layout: "loginLayout.handlebars" });
    });

    server.get("/about", (req, res) => {
        res.render("aboutus");
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

    server.post("/myreviews", isAuthenticated, (req, res) => {

        let data = req.body;

        db.Review.create({
            imgURL: data.imgURL,
            track_name: data.track_name,
            track_artist: data.track_artist,
            track_id: data.track_id,
            rating: data.rating,
            review_text: data.review_text,
            UserId: req.user.id
        }).then((newReview) => {
            res.json({ saved: true });
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
                },
                include: [db.User]
            }).then(data => {
                res.render("myreviews", {
                    reviews: buildObjectFromDB(data)
                });
            });
        }
    });

    server.get("/db/search/:query", isAuthenticated, (req, res) => {
        let query = req.params.query;

        db.Review.findAll({
            where: {
                track_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('track_name')), 'LIKE', '%' + query + '%')
            },
            include: [db.User]
        }).then((results) => {
            res.render("reviewSearch", {
                reviews: buildObjectFromDB(results)
            })
        });
    });

    server.get("/search", isAuthenticated, (req, res) => {
        res.render("search", { layout: "searchLayout.handlebars" });
    });

    server.get("/api/search/:query", isAuthenticated, (req, res) => {
        let query = req.params.query;


        let queryURL = `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=10`;

        axios.get(queryURL, { headers: { Authorization: `Bearer ${req.user.access_token}` } }
        ).then(response => {
            res.render("search", {
                layout: "searchLayout.handlebars",
                track: buildTrackObject(response.data.tracks.items)
            });
        })
            .catch(error => {
                console.log("Refreshing token for" + req.user.id);
                refreshAccessToken(req.user, res, query); //if the api fails to validate client, refresh token
            });
    });

    refreshAccessToken = (user, res, query) => {

        let refresh_token = user.refresh_token; //get there old token

        axios.post("https://accounts.spotify.com/api/token",
            {
                headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                body: qs.stringify({
                    grant_type: "refresh_token",
                    refresh_token: refresh_token,
                    client_id: process.env.API_CLIENT_ID,
                    client_secret: process.env.API_CLIENT_SECRET
                })
            }).then(axRes => {
                let newAuthToken = axRes.data.access_token;

                db.User.update({
                    where: {
                        id: user.id
                    },
                    access_token: newAuthToken
                }).then(() => {
                    console.log("refresed token for user: " + user.id);
                    res.redirect("/api/search/" + query);
                });
            });
    }

    server.post("/write/review", isAuthenticated, (req, res) => {
        let data = req.body;

        db.Meta.create({ //creates meta data for track they selected
            imgURL: data.imgURL,
            track_name: data.track_name,
            track_artist: data.track_artist,
            track_id: data.track_id
        }).then((createdMeta) => {
            let metaURL = "/write/review/" + createdMeta.id; //adds meta data id to review url
            res.json({ url: metaURL });//sends them there
        });
    });

    server.get("/write/review/:id", isAuthenticated, (req, res) => {

        let metaId = req.params.id;

        db.Meta.findOne({ //get meta we created from post
            where: {
                id: metaId
            }
        }).then((meta) => {

            let data = { //build data object out of meta data
                imgURL: meta.imgURL,
                track_name: meta.track_name,
                track_artist: meta.track_artist,
                track_id: meta.track_id
            }

            meta.destroy(); //destroy meta in db

            res.render("writereview", { //render write review page with data
                data: data
            });
        });
    });

    buildTrackObject = (items) => {

        let builtItems = [];

        items.forEach(e => {
            builtItems.push({
                imgURL: e.album.images[0].url,
                track_name: e.name,
                track_artist: e.artists[0].name,
                track_id: e.id
            });
        });
        return builtItems;
    }

    buildObjectFromDB = (dbDat) => { //This function explcitly creates an array of objects from DB data that Handlebars will understand
        let newObj = [];
        dbDat.forEach(e => {
            let data = e.dataValues;

            newObj.push({
                imgURL: data.imgURL,
                track_name: data.track_name,
                track_artist: data.track_artist,
                track_id: data.track_id,
                rating: data.rating,
                user_name: data.User.user_name,
                user_img: data.User.img_url,
                review_text: data.review_text
            });
        });
        console.log(newObj);
        return newObj;
    }

}
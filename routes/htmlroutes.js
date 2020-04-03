require("dotenv").config();
const axios = require("axios");
const qs = require('qs')

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
        res.render("feed", object);
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


    //This route brings the user to spotify api auth
    server.get("/login", (req, res) => {

        let scopes = 'user-read-private user-read-email';
        let redirect_uri = "http://localhost:8080/callback";

        res.redirect('https://accounts.spotify.com/authorize?client_id=' + process.env.API_CLIENT_ID +
            '&response_type=code&redirect_uri=' + encodeURIComponent(redirect_uri) + '&scope=' + encodeURIComponent(scopes));
    });


    //this is where the spotify auth will return
    server.get("/callback", (req, res) => {

        let reqURL = req.originalUrl;

        let authCode = '';
        let redirect_uri = "http://localhost:8080/callback";

        if (reqURL.includes("/callback?code=")) {
            authCode = reqURL.substring(15);
        }
        else if(req.URL.includes("/callback?error=")){

            console.log("there is an error");
        }

        axios({
            method: 'post',
            url: "https://accounts.spotify.com/api/token",
            headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }, 
            data: qs.stringify({
                grant_type: "authorization_code",
                code: authCode,
                redirect_uri: redirect_uri,
                client_id: process.env.API_CLIENT_ID,
                client_secret: process.env.API_CLIENT_SECRET
            })
        }).then(axRes => {
            console.log(axRes);
        });


        res.redirect("/feed");
    });

    server.get("/logout", (req, res) => {
        let object = {

            logout: "Where the hell are you going?"
        };
        res.render("logout", object);
    });


}
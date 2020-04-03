require("dotenv").config();

module.exports = function (server) {


    server.get("/", (req, res) => {

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


    server.get("/login", (req, res) => {

        let scopes = 'user-read-private user-read-email';
        let redirect_uri = "http://localhost:8080/callback";

        res.redirect('https://accounts.spotify.com/authorize?client_id=' + process.env.API_CLIENT_ID +
            '&response_type=code&redirect_uri=' + encodeURIComponent(redirect_uri) + '&scope=' + encodeURIComponent(scopes));
    });



    server.get("/callback", (req, res) => {

        let reqURL = req.originalUrl;

        let authCode = '';

        if (reqURL.includes("/callback?code=")) {
            authCode = reqURL.substring(15);
        }


        res.render("index");
    });


}
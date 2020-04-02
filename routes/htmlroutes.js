require("dotenv").config();

module.exports = function (server) {

    server.get("/", (req, res) => {
        let object = {
            reviews: [
                { username: "cool thing", stars: 5 },
                { username: "cool thing 2", stars: 8 },
                { username: "cool thing 3", stars: 8 },
                { username: "cool thing 4", stars: 8 }
            ],
            username: "josh"
        };
        res.render("index", object);
    });

    server.get("/entries", (req, res) => {
        let object = {
            reviews: [
                { username: "cool thing", stars: 5 },
                { username: "cool thing 2", stars: 8 },
                { username: "cool thing 3", stars: 8 },
                { username: "cool thing 4", stars: 8 }
            ],
            other: "username"
        };
        res.render("entries", object);
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

        if(reqURL.includes("/callback?code=")){
            authCode = reqURL.substring(15);
        }
        

        res.render("index");
    });


}
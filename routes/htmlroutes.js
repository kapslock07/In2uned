require("dotenv").config();

module.exports = function(server){

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
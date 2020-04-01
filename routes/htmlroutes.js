require("dotenv").config();

module.exports = function(server){

    server.get("/", (req, res) => {

        let scopes = 'user-read-private user-read-email';
        let redirect_uri = "http://localhost:8080/callback";
                            
        res.redirect('https://accounts.spotify.com/authorize?client_id=' + process.env.API_CLIENT_ID + 
        '&response_type=code&redirect_uri=' + encodeURIComponent(redirect_uri) + '&scope=' + encodeURIComponent(scopes));
    });

       

    server.get("/callback", (req, res) => {

        res.render("index");
    });


}
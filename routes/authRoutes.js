const axios = require("axios");
const qs = require('qs')

module.exports = function(server, passport){

    server.get('/auth/spotify',
        passport.authenticate('provider', { scope: ['user-read-private', 'user-read-email'] })
    );

    server.get('/auth/spotify/callback',
    passport.authenticate('provider'), (req, res) => {
        res.redirect("/feed");
    });

    server.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

}
let passport = require("passport");
let OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
require("dotenv").config();
const axios = require("axios");
let db = require("../models");

passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://accounts.spotify.com/authorize',
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientID: process.env.API_CLIENT_ID,
    clientSecret: process.env.API_CLIENT_SECRET,
    callbackURL: "/auth/spotify/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    axios({
        method: 'get',
        url: "https://api.spotify.com/v1/me",
        headers: { 'Authorization': `Bearer ${accessToken}`}, 
    }).then(axRes => {
        let user_name = axRes.data.display_name;
        let img_url = axRes.data.images[0].url;
        console.log(axRes.data);

        db.User.findOne({
            where: {
                user_name: user_name
            }
        }).then(dbUser => {
    
            if(!dbUser){
                db.User.create({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    user_name: user_name,
                    img_url: img_url
                }).then(function(createdUser){
                    return done(null, createdUser);
                });
            }
            else {
                return done(null, dbUser);
            }
        });
    });
  }
));


passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
  

module.exports = passport;

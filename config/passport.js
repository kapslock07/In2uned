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
    
            if(!dbUser){ //creates user if doesnt exist
                db.User.create({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    user_name: user_name,
                    img_url: img_url
                }).then((createdUser) => {
                    console.log("created USer: " + createdUser);
                    return done(null, createdUser);
                });
            }
            else if(dbUser){ //updates user token and img url if exists
                dbUser.update(
                    {
                        access_token: accessToken,
                        refreshToken: refreshToken,
                        img_url: img_url
                    },
                    {
                        where: {
                            user_name: user_name
                        }
                    }
                ).then((updatedUser) => {
                    console.log("Updated USer: " + updatedUser);
                    return done(null, updatedUser);
                });
            }
        });
    });
  }
));


passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});
  
module.exports = passport;

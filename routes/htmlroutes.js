

module.exports = function (server) {

    server.get("/", (req, res) => {
        let object = {
            reviews: [
                { username: "User 1", review_name: "song 1", rating: 5, review_text: "dfhjajdshfadsfjksadhfdasjlkfhdasljkfhdskjfhadsljkf" },
                { username: "User 2", review_name: "song 2", rating: 4, review_text: "eJKFHDASLJKHFLJKSDAHFLJKADSHFLADSJKHF" },
                { username: "User 3", review_name: "song 3", rating: 3, review_text: "sdjlfhdasjkhfdsajhfadsjkhflsadjkfgijasd" },
                { username: "User 4", review_name: "song 4", rating: 2, review_text: "asdghfjkldgsahfjkgasdfhjdsagfkhj" }
            ],
            username: "ryan"
        };
        res.render("index", object);
    });

    server.get("/myreviews", (req, res) => {
        let object = {
            reviews: [
                { review_name: "song 1", rating: 5, review_text: "dfhjajdshfadsfjksadhfdasjlkfhdasljkfhdskjfhadsljkfdha" },
                { review_name: "song 2", rating: 4, review_text: "eJKFHDASLJKHFLJKSDAHFLJKADSHFLADSJKHF" },
            ],
            username: "My User Name"
        };
        res.render("entries", object);
    });


    server.get("/logout", (req, res) => {
        let object = {

            logout: "Where the hell are you going?"
        };
        res.render("logout", object);
    });


}
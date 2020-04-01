

module.exports = function(server){

    server.get("/", (req, res) => {
        let object = {
            reviews: [
                {username: "cool thing", stars:5},
                {username: "cool thing 2", stars:8},
                {username: "cool thing 3", stars:8},
                {username: "cool thing 4", stars:8}
            ],
            username: "josh"
        };
        res.render("index", object);
    });

    server.get("/entries", (req, res) => {
        let object = {
            reviews: [
                {name: "cool thing"},
                {name: "cool thing 2"},
                {name: "cool thing 3"},
                {name: "cool thing 4"}
            ],
            other: "whatever"
        };
        res.render("entries", object);
    });


}
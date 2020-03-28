

module.exports = function(server){

    server.get("/", (req, res) => {

        res.render("index");
    });




}
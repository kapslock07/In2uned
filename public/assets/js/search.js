$(document).ready(() => {

    $("#searchButton").on("click", (event) => {
        event.preventDefault();
        
        let query = $("#qInput").val().trim();

        $.ajax({
            method: "POST",
            url: "/search",
            data: {
                query: query
            }
        }).then((response) => {
            $("#qInput").val().empty();
            console.log(response);
        });        
    });
});


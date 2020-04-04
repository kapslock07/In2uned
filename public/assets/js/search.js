$(document).ready(() => {

    $("#searchButton").on("click", (event) => {
        event.preventDefault();
        
        let query = $("#qInput").val().trim();

        window.location.assign("/api/search/"+query);
    });
});


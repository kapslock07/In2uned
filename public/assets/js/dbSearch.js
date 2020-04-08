$(document).ready(() => {

    $("#dbSearchButton").on("click", (event) => {
        event.preventDefault();

        let query = $("#dbSearchInput").val().trim();

        window.location.assign("/db/search/" + query);

    });
});
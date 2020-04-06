$(document).ready(() => {
    $("#writeReview").on("click", (event) => {
         event.preventDefault();
         

        window.location.assign("/search");
    });
});

var ratingsField = $('#ratings-hidden');


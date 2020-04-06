$(document).ready(() => {
    $("#writeReview").on("click", (event) => {
        event.preventDefault();


        window.location.assign("/search");
    });
});

$(document).ready(function () {
    $('#rateMe1').mdbRate();
});
$(document).ready(() => {
    $("#writeReview").on("click", (event) => {
        event.preventDefault();


        window.location.assign("/search");
    });
});

var ratingsField = $('#ratings-hidden');

$('.starrr').on('starrr:change', function (e, value) {
    ratingsField.val(value);
});


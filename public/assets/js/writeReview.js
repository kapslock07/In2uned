$(document).ready(() => {
    console.log("write Review");
    $("#writeReview").on("click", (event) => {
        event.preventDefault();
        console.log("write Review inside");

        window.location.assign("/search");
    });
});

$('.starrr').on('starrr:change', function (e, value) {
    ratingsField.val(value);
});
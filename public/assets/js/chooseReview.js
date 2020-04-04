$(document).ready(() => {
    $("#chooseReviewItemButton").on("click", (event) => {
         event.preventDefault();


         let card = $("#chooseReviewItemButton").parent();

         let imgURL = $(card).attr("data-imgURL");
         let track_name = $(card).attr("data-track_name");
         let track_artist = $(card).attr("data-track_artist");

        $.get({
            url: "/write/review",
            data: {
                imgURL: imgURL,
                track_name: track_name,
                track_artist: track_artist
            }
        }).then(() => {
            window.location.assign("/write/review");
        });
    });
});
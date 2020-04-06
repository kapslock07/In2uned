$(document).ready(() => {
    $(".chooseToReview").on("click", (event) => {
         event.preventDefault();

         let card = $(event.target).parent();
         let imgURL = $(card).attr("data-imgURL");
         let track_name = $(card).attr("data-track_name");
         let track_artist = $(card).attr("data-track_artist");
         let track_id = $(card).attr("data-track_id");

        $.post({
            url: "/write/review",
            data: {
                imgURL: imgURL,
                track_name: track_name,
                track_artist: track_artist,
                track_id: track_id
            }
        }).then((res) => {
            window.location.assign(res.url);
        }); 
    });
});
$(document).ready(() => {
    $("#writeReview").on("click", (event) => {
        event.preventDefault();


        window.location.assign("/search");
    });
});

function add(ths, sno) {
    for (var i = 1; i <= 5; i++) {
        var cur = document.getElementById("star" + i)
        cur.className = "far fa-star"
    }
    for (var i = 1; i <= sno; i++) {
        var cur = document.getElementById("star" + i)
        if (cur.className == "far fa-star") {
            cur.className = "fas fa-star"
        }
    }
}



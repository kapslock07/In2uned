$(document).ready(() => {

    $("#Login").on("click", (event) => {
        event.preventDefault();

        window.location.assign("/login");
    });
});
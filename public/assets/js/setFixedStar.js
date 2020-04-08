$(document).ready(() => {

    let starLists = [];
    starLists = $(".starHandle"); //collects all star lists on page

    for(let i=0;i < starLists.length;i++){//iterates through star list

        let currentStarList = starLists[i];
        
        let stars = [];
        stars = $(currentStarList).children();
        
        let onStar = $(currentStarList).attr("data-starValue"); // The star currently selected
     
        for (x = 0; x < stars.length; x++) {
            $(stars[x]).removeClass('selected');
        }
        
        for (x = 0; x < onStar; x++) {
            $(stars[x]).addClass('selected');
        }
    }
});
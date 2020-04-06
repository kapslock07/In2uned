$(document).ready(() => {


    //STAR CODE FROM https://codepen.io/mmoradi08/pen/yLyYrGg
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
        
        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });
        
        }).on('mouseout', function(){
            $(this).parent().children('li.star').each(function(e){
                $(this).removeClass('hover');
            });
        });
        
        
        /* 2. Action to perform on click */
        $('#stars li').on('click', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently selected
            var stars = $(this).parent().children('li.star');
            
            for (i = 0; i < stars.length; i++) {
                $(stars[i]).removeClass('selected');
            }
            
            for (i = 0; i < onStar; i++) {
                $(stars[i]).addClass('selected');
            }
        
        });

    $("#postbtn").on("click", (event)=>{
        event.preventDefault();

        //get all required data for post
        let imgURL = $("#trackCard").attr("data-imgURL");
        let track_name = $("#trackCard").attr("data-track_name");
        let track_artist = $("#trackCard").attr("data-track_artist");
        let track_id = $("#trackCard").attr("data-track_id");
        let reviewText = $("#reviewText").val().trim();


    });

});

  
  

$(document).ready(() => {

    let starValue = 0; //value that holds what the user chose for star rating


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

            starValue = onStar;
        });

    $("#postbtn").on("click", (event)=>{
        event.preventDefault();

        //get all required data for post
        let imgURL = $("#trackCard").attr("data-imgURL");
        let track_name = $("#trackCard").attr("data-track_name");
        let track_artist = $("#trackCard").attr("data-track_artist");
        let track_id = $("#trackCard").attr("data-track_id");
        let review_text = $("#reviewText").val().trim();

        if(review_text.replace( /\s/g, '').length == 0){//check if the user entered any text (exlcuding spaces)
            makeAlert("Please Input Text to your review");
        }
        else if(starValue === 0){//Check if the user chose a star value
            makeAlert("Please Select a Star Value");
        }
        else{ //If all checks out - Make the Post
          //  console.log({imgURL, track_name, track_artist, track_id, review_text});
            
            $.post({
                url: "/myreviews",
                data: {
                    imgURL: imgURL,
                    track_name: track_name,
                    track_artist: track_artist,
                    track_id: track_id,
                    rating: starValue,
                    review_text: review_text
                }
            }).then((res) => {
                if(res.saved){
                    window.location.assign("/myreviews");
                }
                
            }); 
        }
    });

    function makeAlert(message){ //This function creates an alert message on the page

        let newAlert = $("<div>");
        $(newAlert).attr("id", "ratingAlert");
        $(newAlert).attr("class", "alert alert-danger text-center");
        $(newAlert).attr("role", "alert");
        $(newAlert).append(message);
    
        $("#postButtonParent").prepend($(newAlert));
        $(newAlert).fadeOut(4000);//fades alert out in 4 seconds
    }
});





  
  


//Make an array to loop through tv shows
//add api to be able to search for any gif
//Add buttons through jquery - working buttons
//Add an input search bar to search other movies 
//Make sure it works
//Make sure giphy's pop up 3 in a row on web page
//Add rating for giphs
//Make sure pictures can be clicked to animate then be clicked to un-animate 

$(document).ready(function () {


    var shows = [
        'Hey Arnold',
        'Spongebob',
        'New Girl',
        'Friends',
        'Stranger Things',
        'Full House',
        'Dr. Pimple Popper',
        'The Big Bang Theory',
        'Modern Family',
        'How I Met Your Mother',
        'American Idol',
        'Saturday Day Night Live',
        'Jimmy Fallon',
        'NCIS',
        'Greys Anatomy',
        'Double Dare'
    ];

    //api call to gif's 
    $(document).on("click", ".tv-btn", function () {
        var tvShow = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=0DFbYPoL3Baw4PRlHmIqhxNJaIILMRD5&limit=10" + tvShow;


        // ajax get request
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            //  after data comes back from api
            .done(function (response) {
                //  storing results in results variable
                var results = response.data;
                var container = $("<div class= 'results-container'>");


                // looping over results area
                for (var i = 0; i < results.length; i++) {
                    // console.log(results);
                    var resultsDiv = $("<div class= 'container-result'>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var showImg = $("<img class='result'>");
                    showImg.attr("src", results[i].images.fixed_height.url);
                    showImg.attr("data-state", "animated");
                    showImg.attr("data-animated", results[i].images.fixed_height.url);
                    showImg.attr("data-still", results[i].images.fixed_height_still.url);
                    // console.log(showImg);

                    resultsDiv.prepend(showImg);
                    resultsDiv.prepend(p);
                    container.prepend(resultsDiv);
                    //   shows the api limit results. has to be within function to work
                    $("#show-group").prepend(resultsDiv);
                }


                // console.log(resultsDiv);

            });
    });
    //on click event for aminate and still for images 
    $(document).on("click", ".result", function () {
        var state = $(this).attr("data-state");

        if (state === "animated") {
            // put the src of the new still image 
            $(this).attr("src", $(this).attr("data-still"));
            // change the state to still 
            $(this).attr("data-state", "still");
        } else {
            // put the src of the new animated image 
            $(this).attr("src", $(this).attr("data-animated"));
            // change the state to animated 
            $(this).attr("data-state", "animated");
        }
    });

    // could wrap in a function to call
    //loops through array of tv-shows
    for (var i = 0; i < shows.length; i++) {
        var button = $("<button>").text(shows[i]);// shows text on the button 
        //   console.log(button);
        button.attr("data-name", shows[i]);
        button.addClass("tv-btn"); //class added
        $("#button-view").append(button); //adds button to html 
    }
    // This function handles events where a show button is clicked
    $("#new-show").on("click", function (event) {
        event.preventDefault();
        var existentButtons = false;
        if (shows.indexOf($("#new-show").val()) !== -1) {
            existentButtons = true;
        }
        //adding new show to new button 
        if ($("#add-show").val() !== "" && existentButtons === false) {
            var show = $("#add-show").val();
            shows.push(show);
            var button = $("<button>").text(show);
            button.attr("data-name", show);
            button.addClass("tv-btn");
            $("#button-view").append(button);

        }
        $("#add-show").val("");

    });

});




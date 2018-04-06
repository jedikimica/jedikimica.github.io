
$(document).ready(function () {

	// global variables
	var topics = ['Superman', 'Batman', 'Wonder Woman', 'The Flash', 
		'Green Lantern', 'Aquaman','Batgirl', 'Supergirl'];
	
// create buttons from array
	function renderButtons () { 

		// loops through the array of topics
		for (var i = 0; i < topics.length; i++) {

		    var a = $('<button>')
		    a.addClass('topic button'); // add a class 
		    a.attr('data-name', topics[i]); // adds a data-attribute
		    a.text(topics[i]); // initial button text
		    $('#buttonsDiv').append(a); // add button to the HTML
		}
	};

//  events where one button is clicked
	$('#addTopic').on('click', function (event) {
		// prevents page reload if user hits enter instead of clicks button
		event.preventDefault();

		// input from the textbox
		var topic = $('#topicInput').val().trim();

		// add topic to array
		topics.push(topic);
		
		// topic array buttons
		renderButtons();	
		$('#topicInput').empty();
	});


	// button on-click function
    function gifFetch () {
    	// empty the galleryDiv
    	$('#galleryDiv').empty();
		// query var will be where the search topic goes
		var query = $(this).data('name');

		// api endpoint url
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=20&q=" + query;

        // makes the request for data from url
        $.ajax({
        		url: queryURL, 
        		method: 'GET'
       		}).done(function(response) {
            	// defines what to do with data when done

            	var results = response.data;
            	var rating = results.rating;
            	console.log(rating);

            	for (var i = 0; i < results.length; i++) {
            		if (rating == "r" || rating == "pg-13"){

            		}
            		else {
	            		var p = $('<p>');
	            		// p.html("Rating: " + rating);

	            		// $('#galleryDiv').append(p);

		                // dump image from response into variable
		                var imageUrl = results[i].images.fixed_height.url;
		                // remove .gif from end 
		                var urlCut = imageUrl.slice(0, (imageUrl.length - 4));
		                // add _s.gif to end for still images
		                var stillImage = urlCut + "_s.gif";

		                // create image HTML element with jquery
		                var topicImage = $("<img class='topicImage'>");
		                
		                // set attributes for source and alt text in img element
		                topicImage.attr('src', stillImage);
		                topicImage.attr('alt', 'topic image');
		                topicImage.attr('data-still', stillImage);
		                topicImage.attr('data-animate', imageUrl);
		                topicImage.attr('data-state', 'still');

		                // dump them to the page
		                $('#galleryDiv').prepend(topicImage);
		            }
            	}
            });
    };

   
    // animate or pause function
    function animate () {
    	var state = $(this).attr('data-state'); 
    	console.log(state);
    	// animate or pause
    	if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
    };

	// This calls the renderButtons() function
	renderButtons();
	// event listeners
	$(document).on('click', '.topic', gifFetch);
	$(document).on('click', '.topicImage', animate)
});
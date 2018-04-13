/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://pixabay.com/api/";
  
    // add the api key parameter (the one we received when we registered)
    queryURL += "?api-key=8677244-dfd7cfd38bf475092dfe14341";
  
    // grab text the user typed into the search input, add as parameter to url
    var searchTerm = $("#breakfast").val().trim();
    queryURL += "&q=" + searchTerm;
}  
var queryURL = buildQueryURL();

$.ajax({
    url: queryURL,
    method: "GET"
  })

     // After the data from the AJAX request comes back
     .then(function(response) {

        // Saving the image_original_url property
          var imageUrl = response.data.imageUrl;

          // Creating and storing an image tag
          var breakfastImage = $("<img>");

          // Setting the catImage src attribute to imageUrl
          breakfastImage.attr("src", imageUrl);
          breakfastImage.attr("alt", "cat image");

          // Prepending the catImage to the images div
          $("#images").prepend(catImage);
        });
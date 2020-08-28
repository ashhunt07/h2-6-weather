
//global variables
var apiKey = "67d19e2b34aa4341617b42310a8a49b4";
var currentConditions = "https://api.openweathermap.org/data/2.5/weather?appid=" +apiKey;
var fiveDay ="https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey;
var uvIndex ="https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";

var city = "";
//pull from local storage
// let value = localStorage.getItem(lastCitySearch);
// searchHistory.val(value);

$(document).ready(function(){


// //button to save last search to local storage
// buttonEl.on("click", function(){
//     var lastCitySearch = $(this).sibling('textarea').val();
//     localStorage.setItem(lastCitySearch);


    // for (i = 0; i < newCities.length; ++i){

    // }

// })

    var cont = $("#container");
        cont.attr('class', 'content row col-12');


//left area containers
    var lookUp = $("<div>")
        lookUp.attr('class', 'lookUp row col-4');


        
//seartch and save functions with history
    var searchDiv = $("<textarea>");
        searchDiv.attr('class', 'inputCity')

    var buttonEl = $("<button>");
        buttonEl.attr('class', 'btn btn-primary searchBtn');
        var searchEl = document.createTextNode("Click me");
        // searchEl.innerHTML = "Do Something";
        //buttonEl.value = 'text';

    var searchHistory = $("<p>")
        searchHistory.attr('class', 'seachList')


//right area containers
    var results =  $("<div>")
        results.attr('class', 'searchResult row col-8')

    var currentCity = $("<div>");
        currentCity.attr('class', 'currentCity card-body row col-12')
    var currentTitle = $("<h3>");
        currentTitle.attr('class', 'card-title')
    var cityTemp = $("<p>");
        cityTemp.attr('class', 'card-text')
    var humidity = $("<p>");
        humidity.attr('class', 'card-text')
    var windSpeed = $("<p>");
        windSpeed.attr('class', 'card-text')
    var uv = $("<p>");
        uv.attr('class', 'card-text')
    //results
    var weatherEl = $("<div>");
        weatherEl.attr('class', 'weatherBlock card-body row col-12')
    var weatherDate = $("<h5>");
        weatherDate.attr('class', 'card-title')
    var weatherIcon = $("<img>");
    var weatherTemp = $("<p>");
        weatherTemp.attr('class', 'card-text')
    var weatherHumid = $("<p>");
        weatherHumid.attr('class', 'card-text')


//append lookUp seach elements
cont.append(lookUp);
lookUp.append(searchDiv);
lookUp.append(buttonEl);
    buttonEl.append(searchEl);
lookUp.append(searchHistory);

//append results
cont.append(results);

//append currentCity 
results.append(currentCity);

//current city top level info
currentCity.append(currentTitle)
currentCity.append(cityTemp);
currentCity.append(humidity);
currentCity.append(windSpeed);
currentCity.append(uv);

//result or search weather block
results.append(weatherEl);

//append weather block elements
weatherEl.append(weatherDate);
weatherEl.append(weatherIcon);
weatherEl.append(weatherTemp);
weatherEl.append(weatherHumid);






// var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid={67d19e2b34aa4341617b42310a8a49b4}";

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response);
// });



//format date with moment.js

//5 day api
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}


//inside of the first API Call
//Forcast API
//Uv API

});
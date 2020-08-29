$(document).ready(function(){

//global variables
let city = "Austin";
const apiKey = "67d19e2b34aa4341617b42310a8a49b4";

//can get lat and lon from here
let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

//input lat and lon into these
let fiveDayURL ="https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=" +apiKey;
let uvURL ="http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey +"&lat={lat}&lon={lon}"





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

//append lookUp seach elements
    $("#header").append(lookUp);
    lookUp.append(searchDiv);
    lookUp.append(buttonEl);
        buttonEl.append(searchEl);
    lookUp.append(searchHistory);



//main container with all weather lookup information
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



//results
    var fiveDay = $("<div>");
        fiveDay.attr('class', 'fiveDays')
    var weatherEl = $("<div>");
        weatherEl.attr('class', 'weatherBlock card-body')
    var weatherDate = $("<h5>");
        weatherDate.attr('class', 'card-title')
    var weatherIcon = $("<img>");
    var weatherTemp = $("<p>");
        weatherTemp.attr('class', 'card-text')
    var weatherHumid = $("<p>");
        weatherHumid.attr('class', 'card-text')




//result or search weather block
results.append(fiveDay);
fiveDay.append(weatherEl)
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
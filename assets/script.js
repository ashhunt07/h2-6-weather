
//global variables
let city = "Austin";

const apiKey = "67d19e2b34aa4341617b42310a8a49b4";
let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
let dailyURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey;

//pull from local storage
// let value = localStorage.getItem(lastCitySearch);
// searchHistory.val(value);

$(document).ready(function(){

function getWeather(){
    
    
    $.ajax({
        url: dailyURL,
        method: "GET"
    }).then(function(forecast){
        console.log(forecast);

        var lat = forecast.city.coord.lat;
        var lon = forecast.city.coord.lon;
        console.log(forecast.city.coord);
        
    
    
    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++){

        currentCity.text(response.name);
        console.log(response.name);
        
        // console.log(response.weather[0].description);
        var iconCode = response.weather[0].icon
        var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        weatherIcon.html('src', iconurl);
        console.log(response.weather[0].icon);
        
        humidity.text(response.main.humidity);
        console.log(response.main.humidity);
        
        cityTemp.text(response.main.temp);
        console.log(response.main.temp);

        windSpeed.text(response.wind.speed);
        console.log(response.wind.speed);


        }

        })    
    

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


buttonEl.on("click", function() {
event.preventDefault();

})


    



})
    }

    getWeather()

});


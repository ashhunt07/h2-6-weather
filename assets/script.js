
$(document).ready(function(){
//global variables
// let city = [];

var cont = $("#container").attr('class', 'content row col-12 container-fluid');

//left area containers
var lookUp = $("<div>").attr('class', 'lookUp col-8');

var searchDiv = $("<textarea>").attr('class', 'inputCity');

var buttonEl = $("<button>").attr('class', 'btn btn-primary searchBtn');
var searchEl = document.createTextNode("Click me");

var searchHistory = $("<p>").attr('class', 'seachList');


//right area containers
var searchResults = $("<div>").attr('class', 'searchResult row col-12 container-fluid d-flex flex-row flex-wrap align-items-center justify-content-center');

//append lookUp seach elements
$("#header").append(lookUp);
lookUp.append(searchDiv);
lookUp.append(buttonEl);
    buttonEl.append(searchEl);
lookUp.append(searchHistory);



const apiKey = "67d19e2b34aa4341617b42310a8a49b4";
let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
let dailyURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey;



//pull from local storage
// let value = localStorage.getItem(lastCitySearch);
// searchHistory.val(value);




var city = searchDiv.val();
searchDiv.val("");


    
    
    buttonEl.on("click", function(){
        event.preventDefault();    

        weather(city);
        
    });
    
    //this function will display current info
    function locationInfo(currentCity, cityTemp, humidity, windSpeed, currentTitle){

        // $("#location").empty();
        // $("#temp").empty();
        // $("#humidity").empty();
        // $("#wind").empty();

        var currentCity = $("<div>").attr('class', 'currentCity card-body row col-12');
        var currentTitle = $("<h3>").attr('class', 'card-title');
        var cityTemp = $("<p>").attr('class', 'card-text');

        var humidity = $("<p>").attr('class', 'card-text');
        var windSpeed = $("<p>").attr('class', 'card-text');
    
    
        
        //append results
        cont.append(searchResults);

        //append currentCity 
        searchResults.append(currentCity);

        //current city top level info
        currentCity.append(currentTitle)
        currentCity.append(cityTemp);
        currentCity.append(humidity);
        currentCity.append(windSpeed);

    }
    

    
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
    }).then(function(weatherResponse){
        console.log(weatherResponse);

        for(i = 0; i < 5; i++){  
            
            // currentCity.text("");
            // currentCity.text(weatherResponse.name);

            //results
            var weatherEl = $("<div>").attr('class', 'weatherBlock card-body');
            var weatherDate = $("<h6>").attr('class', 'card-title');
            var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + iconCode + "@2x.png");
                var iconCode = weatherResponse.weather[0].icon;
            var weatherTemp = $("<p>").attr('class', 'card-text');
            var weatherHumid = $("<p>").attr('class', 'card-text');

            //formatting information
            weatherDate.text(moment().add(i+1, "days").format("l"));

            // weatherIcon.attr("src", "http://openweathermap.org/img/w/" + weatherResponse[i+1].weather[0].iconCode + ".png");
            // weatherTemp.text("Temp: " + weatherResponse[i+1].temp.max + " F");
            // weatherHumid.text("Humidity: " + weatherResponse[i+1].humidity + " %");
            
            weatherTemp.text("Temp: " + weatherResponse.main.temp_max  + " F"); 
            weatherHumid.text("Humidity: " + weatherResponse.main.humidity + " %");

            //result or search weather block
            searchResults.append(weatherEl);
                //append weather block elements
                weatherEl.append(weatherDate);
                weatherEl.append(weatherIcon);
                weatherEl.append(weatherTemp);
                weatherEl.append(weatherHumid);

        console.log(weatherResponse.name);
        console.log(weatherResponse.weather[0].icon);
        console.log(weatherResponse.main.humidity);
        console.log(weatherResponse.main.temp); 

        uvIndex(api, latitude, longitude);

        }

        

        // }

        })   
        
    
        function uvIndex(apiKey, lat, lon){
            var uvIndexURL= "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey +"&lat=" + lat + "&lon=" + lon;
            
    $.ajax({
            url: uvIndexURL,
            method: "GET"
    }).then(function(response) {
            
            uv.empty();
            
        
            var uv = $("<p>").attr('class', 'card-text').text("UV Index: " + response.value);
            currentCity.append(uv);
            
            
            
            });
    }







    locationInfo()

})
});


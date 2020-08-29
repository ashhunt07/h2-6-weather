
//global variables
// let city = [];

var cont = $("#container").attr('class', 'content row col-12');

//left area containers
var lookUp = $("<div>").attr('class', 'lookUp col-4');

var searchDiv = $("<textarea>").attr('class', 'inputCity');

var buttonEl = $("<button>").attr('class', 'btn btn-primary searchBtn');
var searchEl = document.createTextNode("Click me");

var searchHistory = $("<p>").attr('class', 'seachList');


//right area containers
var results = $("<div>").attr('class', 'searchResult row col-8');

var currentCity = $("<div>").attr('class', 'currentCity card-body row col-12');
var currentTitle = $("<h3>").attr('class', 'card-title');
var cityTemp = $("<p>").attr('class', 'card-text');

var humidity = $("<p>").attr('class', 'card-text');
var windSpeed = $("<p>").attr('class', 'card-text');
var uv = $("<p>").attr('class', 'card-text');





// let city = searchDiv.val();

let city = "Austin";
const apiKey = "67d19e2b34aa4341617b42310a8a49b4";
let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
let dailyURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey;

//pull from local storage
// let value = localStorage.getItem(lastCitySearch);
// searchHistory.val(value);

$(document).ready(function(){


    
// buttonEl.on("click", function() {
//     // var city = $(this).siblings("input").val();
//     event.preventDefault();  
//     searchDiv.val("");
    
//     getWeather(city);
// function getWeather(city){
    
    
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
            
            currentCity.text("");
        
            currentCity.text(weatherResponse.name);
            console.log(weatherResponse.name);
            //results
            var weatherEl = $("<div>").attr('class', 'weatherBlock card-body align-items-start flex-wrap');
            var weatherDate = $("<h6>").attr('class', 'card-title');
            var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");
                var iconCode = weatherResponse.weather[0].icon;
            var weatherTemp = $("<p>").attr('class', 'card-text');
            var weatherHumid = $("<p>").attr('class', 'card-text');


            weatherDate.text(moment().add(i+1, "days").format("l"));

            // weatherIcon.attr("src", "http://openweathermap.org/img/w/" + weatherResponse[i+1].weather[0].iconCode + ".png");
            // weatherTemp.text("Temp: " + weatherResponse[i+1].temp.max + " F");
            // weatherHumid.text("Humidity: " + weatherResponse[i+1].humidity + " %");
            
            weatherTemp.text("Temp: " + weatherResponse.main.temp  + " F"); 
            
            weatherHumid.text("Humidity: " + weatherResponse.main.humidity + " %");
    

            
            console.log(weatherResponse.weather[0].icon);
            console.log(weatherResponse.main.humidity);
            console.log(weatherResponse.main.temp);
        
        
        // windSpeed.text(response.wind.speed);
        // console.log(response.wind.speed);


        //result or search weather block
        results.append(weatherEl);

        //append weather block elements
        weatherEl.append(weatherDate);
        weatherEl.append(weatherIcon);
        weatherEl.append(weatherTemp);
        weatherEl.append(weatherHumid);

        }

        

        // }

        })   
        
    

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



    



// })
    // }

    // getWeather()

})
});


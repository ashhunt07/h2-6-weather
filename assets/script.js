$(document).ready(function(){

// Stops cross-site cookie alert in console
document.cookie = "cross-site-cookie=bar; SameSite=Lax";

let city="";

//global variables

const apiKey = "67d19e2b34aa4341617b42310a8a49b4";

// Main Container
    var cont = $("#container").attr('class', 'content row col-12 row justify-content-center');

//Top menu Items
    var lookUp = $("<div>").attr('class', 'lookUp row col-8 justify-content-center');

    var searchForm = $("<div>").attr('class', 'searchBlock col-8 form-inline justify-content-center');
    //search and save functions with history
        var buttonEl = $("<button>");
            buttonEl.attr('class', 'btn btn-primary searchBtn');
            var searchEl = document.createTextNode("Click me");

            var searchDiv = $("<textarea>").attr('class', 'inputCity');

        var searchHistory = $("<p>")
            searchHistory.attr('class', 'seachList')

            $(buttonEl).on("click", function(){
                event.preventDefault();
                let city = $(searchDiv).val();
                $(searchDiv).val("");

                $("#container").empty();
                $(searchDiv).empty();
                weather(city);
            })


        //append lookUp seach elements
        $("#header").append(lookUp);
        lookUp.append(searchForm);
            searchForm.append(searchDiv);
            searchForm.append(buttonEl);
                buttonEl.append(searchEl);
        lookUp.append(searchHistory);

        weather(city);


//function for calling weather APIS

function weather(city){

    var currentURL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(weatherResponse){
        console.log(weatherResponse);

    var lat = weatherResponse.coord.lat;
    var lon = weatherResponse.coord.lon;
    var uvURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +lon + "&appid=" + apiKey;

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function(uvResponse){

        //main container with all weather lookup information
            var results =  $("<div>").attr('class', 'result col-12');

            var currentCity = $("<div>").attr('class', 'currentCity card');
            var cityName = $("<h2>").attr('class', 'card-tite row col-12 justify-content-center');
            var currentTemp = $("<p>").attr('class', 'temp row col-12 justify-content-center');
            var weatherImg = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherResponse.weather[0].icon + "@2x.png").attr('class', 'col-4 mx-auto');
            var currentDesc  = $("<p>").attr('class', 'currentDesc col-12');
            var cityTemp = $("<p>").attr('class', 'card-text col-12');
            var humidity = $("<p>").attr('class', 'card-text col-12');
            var windSpeed = $("<p>").attr('class', 'card-text col-12');
            var uv = $("<p>");

            // weatherImg.
            cityName.text(weatherResponse.name); 
            currentTemp.text(weatherResponse.main.temp); 
            currentDesc.text(weatherResponse.weather[0].description)
            humidity.text("Humidity: " + weatherResponse.main.humidity + " %");
            windSpeed.text("Wind Speed: " +weatherResponse.wind.speed + " mph")
            uv.text("UV Index: " + uvResponse.daily[0].uvi);
                if(uvResponse.daily[0].uvi>=8){
                    uv.attr('class', 'uvBad col-12');
                }else if(uvResponse.daily[0].uvi<8){
                    uv.attr('class', 'uvMod col-12');
                }else if(uvResponse.daily[0].uvi<6){
                    uv.attr('class', 'uvGood col-12');
                }else if(uvResponse.daily[0].uvi<3){
                    uv.attr('class' , 'uvLow col-12');
                }

            console.log(uvResponse)


            
        //append results
        cont.append(results);

        //append currentCity 
        results.append(currentCity);

        //current city top level info
        currentCity.append (weatherImg);
        currentCity.append(cityName);
        currentCity.append(currentTemp);
        currentCity.append(currentDesc);
        currentCity.append(cityTemp);
        currentCity.append(humidity);
        currentCity.append(windSpeed);
        currentCity.append(uv);




//input lat and lon into these
let fiveDayURL ="https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+ "&exclude=minutely,hourly&units=imperial&appid=" +apiKey;

        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function(fiveDayWeather){
            console.log(fiveDayWeather)
            // fiveDay.text("");

            for(i = 0; i < 5; i++){  

                // var searchResults =  $("<div>").attr('class', 'searchResult col-12');


            //results
                var fiveDay = $("<div>").attr('class', 'fiveDays card-deck');
                var weatherEl = $("<div>").attr('class', 'weatherBlock card-body flex');
                var weatherDate = $("<h5>").attr('class', 'card-title row col-12 justify-content-center');
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + fiveDayWeather.current.weather[0].icon + "@2x.png").attr('class', 'row col-5 mx-auto');
                var weatherTemp = $("<p>").attr('class', 'card-text row col-12 justify-content-center');
                var weatherHumid = $("<p>").attr('class', 'card-text row col-12 justify-content-center');


                weatherDate.text(moment().add(i+1, "days").format("l"));
                weatherTemp.text("Temp: " + fiveDayWeather.daily[i+1].temp.max + " F"); 
                weatherHumid.text("Humidity: " + fiveDayWeather.daily[i+1].humidity + " %");
                


                //append results
                cont.append(fiveDay);


                //append currentCity 
                // searchResults.append(fiveDay);

                //result or search weather block
                fiveDay.append(weatherEl);
                //append weather block elements
                weatherEl.append(weatherDate);
                weatherEl.append(weatherIcon);
                weatherEl.append(weatherTemp);
                weatherEl.append(weatherHumid);

        }


})



    })
})



}

}); 
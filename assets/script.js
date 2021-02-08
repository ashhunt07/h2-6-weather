$(document).ready(function(){

// Stops cross-site cookie alert in console
document.cookie = "cross-site-cookie=bar; SameSite=Lax";

// let city="";
let city="converse";

//global variables

// const apiKey = "67d19e2b34aa4341617b42310a8a49b4";
const apiKey = "d44348aab07cb6f1275f92fb8051db91";

// Main Container
    var cont = $("#container").attr('class', 'content col-12 row justify-content-center');


        // Stores previous city to local storage (worked on this with tutor after homework was turned in)
        let oldCity = localStorage.getItem("city") || "";
        console.log('"city" found');
        if (oldCity.length > 0) {
            searchHistory(oldCity);
        }

       // Previous city list functionality (worked on this with tutor after homework was turned in)
    function previousCity(city) {

        var history = JSON.parse(localStorage.getItem("history")) || [];

        if (history.indexOf(city) === -1) {
            history.push(city);
            window.localStorage.setItem("history", JSON.stringify(history));
            // Adds previously searched cities to search bar card 
            let cityListItem = $("<li>").addClass("list-group-item").text(city);
            $(".list").prepend(cityListItem);
            
        }
    }



//Top menu Items
    var searchForm = $("<form>").attr('class', 'searchBlock d-flex');
    //search and save functions with history
        var buttonEl = $("<button>");
            buttonEl.attr('class', 'btn btn-primary searchBtn fa fa-search');

        var searchDiv = $("<input>").attr('class', 'inputCity');

        var searchHistory = $("<div>")
            searchHistory.attr('class', 'searchList');

            $(buttonEl).on("click", function(){
                // preventDefault();
                let city = $(searchDiv).val();
                $(searchDiv).val("");

                $("#container").empty();
                $(searchDiv).empty();
                weather(city);

            })


        //append lookUp seach elements
        $("#form").append(searchForm);
            searchForm.append(searchDiv);
            searchForm.append(buttonEl);

        weather(city);



//function for calling weather APIS
function weather(city){

    // https://cors-anywhere.herokuapp.com/
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(weatherResponse){
        console.log(weatherResponse);

    var lat = weatherResponse.coord.lat;
    var lon = weatherResponse.coord.lon;
    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +lon + "&appid=" + apiKey;

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function(uvResponse){

        //main container with all weather lookup information
            var results =  $("#results").attr('class', 'result col-12 mx-auto');

            var currentCity = $("<div>").attr('class', 'currentCity card mx-auto py-4');
            var cardRow = $("<div>").attr('class', 'col-10 row mx-auto');
            var imgCol = $("<div>").attr('class', 'imgCol col-sm-12 col-lg-6 mx-auto');
            var weatherCol = $("<div>").attr('class', 'weatherCol col-sm-12 col-lg-6 mx-auto my-auto');
            var cityName = $("<h2>").attr('class', 'card-title row justify-content-center');
            var weekDay = $("<h3>").attr('class', 'card-title row justify-content-center');
            var currentDate = $("<h5>").attr('class', 'card-title row justify-content-center');
            var currentTemp = $("<p>").attr('class', 'temp');
            var weatherImg = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherResponse.weather[0].icon + "@2x.png").attr('class', 'col-6 mx-auto');
            var currentDesc  = $("<p>").attr('class', 'currentDesc mx-auto');
            var cityTemp = $("<p>").attr('class', 'card-text');
            var humidity = $("<p>").attr('class', 'card-text');
            var windSpeed = $("<p>").attr('class', 'card-text');
            var uv = $("<p>").attr('class', 'card-text');

            
            // weatherImg.
            cityName.text(weatherResponse.name); 
            currentTemp.text(weatherResponse.main.temp); 
            currentDesc.text(weatherResponse.weather[0].description)
            humidity.text("Humidity: " + weatherResponse.main.humidity + " %");
            windSpeed.text("Wind Speed: " +weatherResponse.wind.speed + " mph")
            uv.text("UV Index: " + uvResponse.daily[0].uvi);
                if(uvResponse.daily[0].uvi>=8){
                    uv.attr('class', 'uvBad');
                }else if(uvResponse.daily[0].uvi<8){
                    uv.attr('class', 'uvMod');
                }else if(uvResponse.daily[0].uvi<6){
                    uv.attr('class', 'uvGood');
                }else if(uvResponse.daily[0].uvi<3){
                    uv.attr('class' , 'uvLow');
                }

            //Getting currenting date
            currentDate.text(moment().format('l'));
            weekDay.text(moment().format('dddd'));
            
            
        //append results
        cont.append(results);

        //append currentCity 
        results.append(currentCity);

        // append row
        currentCity.append(cityName)
        currentCity.append(cardRow);

        // append columns
        cardRow.append(imgCol);
        cardRow.append(weatherCol);
        
        //current city top level info
        // imgCol.append(cityName);
        imgCol.append (weatherImg);
        imgCol.append(currentDesc);
        imgCol.append(weekDay);
        imgCol.append(currentDate);


        weatherCol.append(currentTemp);

        weatherCol.append(cityTemp);
        weatherCol.append(humidity);
        weatherCol.append(windSpeed);
        weatherCol.append(uv);



//input lat and lon into these
let fiveDayURL ="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+ "&exclude=minutely,hourly&units=imperial&appid=" +apiKey;

        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function(fiveDayWeather){
            // console.log(fiveDayWeather)

            for(i = 0; i < 7; i++){ 

            //results
                var multiRes = $("#daily");

                var fiveDay = $("<div>").attr('class', 'fiveDays row justify-content-center');
                var weatherEl = $("<div>").attr('class', 'weatherBlock justify-content-center');
                var weekDay = $("<span>").attr('class', 'col');
                var weatherDate = $("<span>").attr('class', 'col');
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + fiveDayWeather.current.weather[0].icon + "@2x.png").attr('class', 'col-2');
                var weatherTemp = $("<span>").attr('class', 'col');
                var weatherHumid = $("<span>").attr('class', 'col');

                weekDay.text(moment().add(i+1, "days").format('dddd'));
                weatherDate.text(moment().add(i+1, "days").format("l"));
                weatherTemp.text("Temp: " + fiveDayWeather.daily[i+1].temp.max + " F"); 
                weatherHumid.text("Humidity: " + fiveDayWeather.daily[i+1].humidity + " %");
                

                //append results
                cont.append(multiRes);

                multiRes.append(fiveDay);

                //result or search weather block
                fiveDay.append(weatherEl);
                //append weather block elements
                weatherEl.append(weatherIcon);
                weatherEl.append(weekDay)
                weatherEl.append(weatherDate);
                weatherEl.append(weatherTemp);
                weatherEl.append(weatherHumid);
                    };
                });

                previousCity(city);
            });
        });
    };
}); 
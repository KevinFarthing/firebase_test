var config = {
    apiKey: "AIzaSyDjjxmTSePqUavKuLuWmZc-K_tKukvI_Uw",
    // authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://dailyblog-131f8.firebaseio.com/" //,
    // projectId: "<PROJECT_ID>",
    // storageBucket: "<BUCKET>.appspot.com",
    // messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);

// console.log(firebase);

// var ref = firebase.database().ref('players');
// // var playersRef = firebase.database().ref("players/");

var weatherMap = "d630e599f0fe8509f503266e4aaa10de"
var barChart = "fa47da496ca8f216e6cbd7fa0dc9d818"

// api.openweathermap.org / data / 2.5 / weather ? q = London, uk & APPID=d630e599f0fe8509f503266e4aaa10de

var units = "imperial"

// 997423536298-89sv6mt9jp2cqvl2aq9mahth1fmp4rdv.apps.googleusercontent.com // client id
// 6FPOghX7ydNOSluSxunVrA7z // client secret

function weatherGet() {
    var getIP = 'http://ip-api.com/json/';
    var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather';
    $.getJSON(getIP).done(function (location) {
        $.getJSON(openWeatherMap, {
            lat: location.lat,
            lon: location.lon,
            units: units,
            APPID: weatherMap
        }).done(function (weather) {
            if(units == "imperial") {
                var tempNotation = "°F";
                var speedNotation = "f/s";
            } else {
                var tempNotation = "°C";
                var speedNotation = "m/s";
            }
            var city = weather.name;
            var description = weather.weather[0].description;
            var lowTemp = Math.round(weather.main.temp_min);
            var highTemp = Math.round(weather.main.temp_max);
            var currentTemp = Math.round(weather.main.temp);
            var windSpeed = weather.wind.speed;
            var html = `<ul><li>${city}</li><li>Weather is: ${description}</li><li>Low Temp: ${lowTemp+tempNotation}</li><li>High Temp: ${highTemp+tempNotation}</li><li>Temp: ${currentTemp+tempNotation}</li><li>Windspeed: ${windSpeed+" "+speedNotation}</li></ul>`;
            $('#openWeatherMap').html(html);
            // console.log(weather)
        })
    })
    
}

$(document).ready(function () {
    weatherGet();
    // stockGet();
})

$("#impOrMet").change(function () {
    units = this.value;
    weatherGet();
})

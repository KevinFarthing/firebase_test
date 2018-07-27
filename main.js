var config = {
    apiKey: "AIzaSyDjjxmTSePqUavKuLuWmZc-K_tKukvI_Uw",
    // authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://dailyblog-131f8.firebaseio.com/" //,
    // projectId: "<PROJECT_ID>",
    // storageBucket: "<BUCKET>.appspot.com",
    // messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);

var weatherMap = "d630e599f0fe8509f503266e4aaa10de"
var barChart = "fa47da496ca8f216e6cbd7fa0dc9d818"

var units = "imperial";

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
        })
    })
    
}

var blogRef = firebase.database().ref("blogs/");
var photoRef = firebase.database().ref("photos/");
// // var playersRef = firebase.database().ref("players/");


// playersRef.on("child_changed", function(data) {
    //     var player = data.val();
    //     console.log("The updated player name is " + player.name);
    // });
    
function cloudinaryUpload(id) {
    var filePath = $(`#${id}`).val();
    // pseudocode for uploading filepath to cloudinary and return uploaded url
    return filePath;
}
    
    // // ref.remove();
    // // var playersRef = ref.child("players");
$("#addImage").on("click", () => {
    var imgUrl = $("#uploadImage").val(); //cloudinaryUpload("uploadImage");
    var text = $("textarea").val();
    blogRef.push({ // .push is what generates the gigantic ids and that MAY NOT BE DESIRABLE SINCE THEY'LL KEEP DUPLICATING!!! Depends on data type?
        image: imgUrl,
        text: text
    });
})

// // var playersRef = ref.child("players");
$("#photoSubmit").on("click", () => {
    var imgUrl = cloudinaryUpload("imageUpload");
    var photographerName = $("#photographerName").val();
    var modelName = $("#modelName").val();
    var cameraType = $("#cameraType").val();
    photoRef.push({
        image: imgUrl,
        photographer: photographerName,
        model: modelName,
        camera: cameraType
    });
})

function displayBlog() {
    var href = document.location.href;
    var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
    console.log(lastPathSegment);
    if (lastPathSegment === "daily.html" || lastPathSegment === "daily.html?"){
        var ref = blogRef.limitToFirst(4);
        var div = "#dailyDiv";
        var html = "<div class='container'><p>MARIUS SULLA WAS A TOOL</p>"
        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                var imgUrl = data.val().image;
                var text = data.val().text;
                
                html = html + `<ul><li>${imgUrl}</li><li>${text}</li></ul>`
            });
        });
    } else if (lastPathSegment === "photography.html" || lastPathSegment === "index.html" || lastPathSegment === "test.html" || lastPathSegment === "photography.html?" || lastPathSegment === "index.html?" || lastPathSegment === "test.html?") {
        var ref = photoRef.limitToFirst(4);
        var div = "#photoDiv";
        var html = "<div class='container'><p>MARIUS SULLA WAS A TOOL</p>"
        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                var imgUrl = data.val().image;
                var photographerName = data.val().photographer;
                var modelName = data.val().model;
                var cameraType = data.val().camera;
                html = html + `<ul><li>${imgUrl}</li><li>${photographerName}</li><li>${modelName}</li><li>${cameraType}</li></ul>`
            });
        });
    }
    html = html + "</div>"
    $(div).html(html);
}


$(window).load( () => {
    // $(document).ready(function () {
        weatherGet();
        // stockGet();
        // })
    })
    
$("#impOrMet").change(function () {
    units = this.value;
    weatherGet();
})
    
displayBlog();
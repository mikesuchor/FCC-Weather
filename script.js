/* Show The Local Weather - Preliminary Things To Do:
1. I can see the weather in my current location.
2. I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
3. I can push a button to toggle between Fahrenheit and Celsius.
*/

/* Version 2 Wish List

*/

$(document).ready(function() {
  var celcius = true;
  var degrees = 0;
  var weathertype;
  var latitude;
  var longitude;

  /* If geolocation is supported, get the user's latitude and longitude and pass them to the getWeather() function */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeather(latitude, longitude);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  /* Pass the latitude and longitude into the api link */
  function getWeather(latitude, longitude) {
    var apiurl =
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
      latitude +
      "&lon=" +
      longitude;
    /* Get the JSON and get the location, icon, weather type, and max, min, and current temperatures */
    $.getJSON(apiurl, function(json) {
      degrees = json.main.temp;
      weathertype = json.weather[0].main;
      checkWeatherType(weathertype);
      $(".location").html(json.name);
      $(".weathericon").html('<img src="' + json.weather[0].icon + '">');
      $(".weathertype").html(weathertype);
      $(".temp_max").html(json.main.temp_max + "&deg;");
      $(".temp_min").html(json.main.temp_min + "&deg;");
      $(".degrees").html(degrees + "&deg;");
    });
  }

  /* Change the background image based on the weather type, not sure if there's a way to see all the options available as there's no documentation */
  function checkWeatherType(type) {
    if (type === "Clouds") {
      $(".screen").css(
        "background-image",
        "url(" +
          "https://static.pexels.com/photos/129539/pexels-photo-129539.jpeg" +
          ")"
      );
    } else if (type === "Smoke") {
      $(".screen").css(
        "background-image",
        "url(" +
          "https://static.pexels.com/photos/167699/pexels-photo-167699.jpeg" +
          ")"
      );
    } else if (type === "Clear") {
      $(".screen").css(
        "background-image",
        "url(" +
          "https://static.pexels.com/photos/281260/pexels-photo-281260.jpeg" +
          ")"
      );
    } else if (type === "Thunderstorm") {
      $(".screen").css(
        "background-image",
        "url(" +
          "https://static.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg" +
          ")"
      );
    } else if (type === "Rain") {
      $(".screen").css(
        "background-image",
        "url(" +
          "https://static.pexels.com/photos/125510/pexels-photo-125510.jpeg" +
          ")"
      );
    }
  }
  
  /* Toggles between C and F */
  $(".celcius, .fahrenheit").on("click", function() {
    if (celcius) {
      degrees = degrees * 1.8 + 32;
      celcius = false;
      $(".temp_max, .temp_min, .degrees").html(Math.round(degrees) + "&deg;");
      $(".celcius").css("color", "#777");
      $(".fahrenheit").css("color", "#fff");
    } else {
      degrees = (degrees - 32) / 1.8;
      celcius = true;
      $(".temp_max, .temp_min, .degrees").html(Math.round(degrees) + "&deg;");
      $(".celcius").css("color", "#fff");
      $(".fahrenheit").css("color", "#777");
    }
  });
});
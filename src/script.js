// Dealing with dates and times
let now = new Date();
let day = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekdayToday = weekdays[now.getDay()];

let weekdayTodayText = document.querySelector("#date-and-time");
weekdayTodayText.innerHTML = `${weekdayToday}, ${hours}:${minutes}`;

let apiKey = "c6ca586286ea213d4f29918b81fd9858";
let apiUrlBase = "https://api.openweathermap.org/data/2.5/weather?";

//City Search
function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  let cityHeader = document.querySelector("#city-name");
  cityHeader.innerHTML = `${cityInput.value}`;
  console.log(cityInput.value);
  let urlCitySearch = `${apiUrlBase}q=${cityInput.value}&appid=${apiKey}`;
  console.log(urlCitySearch);
  //   convertToCelcius(urlCitySearch);
  //   convertToFahrenheit(urlCitySearch);
  //   return urlCitySearch;
}

let cityInputForm = document.querySelector("#inputCity");
cityInputForm.addEventListener("submit", updateCity);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);

//Geolocation
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlCurrentPosition = `${apiUrlBase}lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log(lon);
  console.log(lat);
  console.log(urlCurrentPosition);
  //   convertToCelcius(urlCurrentPosition);
  //   convertToFahrenheit(urlCurrentPosition);
  //   return urlCurrentPosition;
}

function geolocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let buttonCurrentPosition = document.querySelector("#current-city-button");
buttonCurrentPosition.addEventListener("click", geolocate);

function convertToCelcius(url) {
  let unit = `metric`;
  let urlPass = url;
  console.log(urlPass);
  apiCall(`url`);
}

function convertToFahrenheit(url) {
  let unit = `imperial`;
  let urlPass = url;
  console.log(urlPass);
  let finalUrlFahrenheit = `${urlPass}&units=${unit}`;
  console.log(finalUrlFahrenheit);
  apiCall(finalUrlFahrenheit);
}

//Switch between Celcius and Fahrenheit
function handleUnit() {
  //let temperatureUnit = `metric`;
  let headerTemperatureUnit = document.querySelector(
    "#header-temperature-unit"
  );
  if (document.querySelector("#unitToggle").checked) {
    headerTemperatureUnit.innerHTML = `°F`;
    convertToFahrenheit();
  } else {
    headerTemperatureUnit.innerHTML = `°C`;
    convertToCelcius();
  }
}

function apiCall(url) {}

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

//Switch between Celcius and Fahrenheit
function unitIsChecked() {
  let headerTemperatureUnit = ``;
  let headerTemperatureDegrees = document.querySelector(
    "#header-temperature-unit"
  );
  if (document.querySelector("#unitToggle").checked) {
    temperatureUnit = `imperial`;
    headerTemperatureDegrees.innerHTML = `°F`;
    return temperatureUnit;
  } else {
    temperatureUnit = `metric`;
    headerTemperatureDegrees.innerHTML = `°C`;
    return temperatureUnit;
  }
}

let apiKey = "c6ca586286ea213d4f29918b81fd9858";
let apiUrlBase = "https://api.openweathermap.org/data/2.5/weather?";

function showWeather(response) {
  //Changing the city name
  let city = response.data.name;
  console.log(city);
  let cityHeader = document.querySelector("#city-name");
  cityHeader.innerHTML = `${city}`;
  //Changing the current weather
  let currentTemperature = Math.round(response.data.main.temp);
  let currentWeatherMain = response.data.weather[0].main;
  let currentWeatherDetail = response.data.weather[0].description;
  //Logging results
  console.log(response);
  console.log(currentTemperature);
  console.log(currentWeatherDetail);
  console.log(currentWeatherMain);
}

//Upadting searched cities
function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  let cityHeader = document.querySelector("#city-name");
  cityHeader.innerHTML = `${cityInput.value}`;
}

let cityInputForm = document.querySelector("#citySearchForm");
cityInputForm.addEventListener("submit", updateCity);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("submit", updateCity);

//Upading current city
function handlePosition(position, temperatureUnit) {
  let unit = `${temperatureUnit}`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlCurrentPosition = `${apiUrlBase}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(urlCurrentPosition).then(showWeather);
  console.log(urlCurrentPosition);
}

// function grabPosition() {
//   navigator.geolocation.getCurrentPosition(handlePosition);
// }

let buttonCurrentPosition = document.querySelector("#current-city-button");
buttonCurrentPosition.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(handlePosition)
);

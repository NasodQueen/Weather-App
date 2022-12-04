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

//Lunar Phase Calculations - https://jasonsturges.medium.com/moons-lunar-phase-in-javascript-a5219acbfe6e
//Obtain Julian Date
const getJulianDate = (date = new Date()) => {
  const time = date.getTime();
  const tzoffset = date.getTimezoneOffset();

  return time / 86400000 - tzoffset / 1440 + 2440587.5;
};

//calculate days or percentage through the lunar month
const LUNAR_MONTH = 29.530588853;
const getLunarAge = (date = new Date()) => {
  const percent = getLunarAgePercent(date);
  const age = percent * LUNAR_MONTH;
  return age;
};
const getLunarAgePercent = (date = new Date()) => {
  return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
};
const normalize = (value) => {
  value = value - Math.floor(value);
  if (value < 0) value = value + 1;
  return value;
};

//apply percentages to get the lunar phase
const getLunarPhase = (date = new Date()) => {
  const age = getLunarAge(date);
  if (age < 1.84566) return "New";
  else if (age < 5.53699) return "Waxing Crescent Moon";
  else if (age < 9.22831) return "First Quarter Moon";
  else if (age < 12.91963) return "Waxing Gibbous Moon";
  else if (age < 16.61096) return "Full Moon";
  else if (age < 20.30228) return "Waning Gibbous Moon";
  else if (age < 23.99361) return "Last Quarter Moon";
  else if (age < 27.68493) return "Waning Crescent";
  return "New";
};

let apiKey = "c6ca586286ea213d4f29918b81fd9858";
let apiUrlBase = "https://api.openweathermap.org/data/2.5/weather?";
let cityHeader = document.querySelector("#city-name");
let currentTemperatureNumber = document.querySelector(
  "#header-temperature-degrees"
);
let currentTemperatureUnit = document.querySelector("#header-temperature-unit");
let currentWeatherDescription = document.querySelector("#header-weather-text");
let feelsLikeTemp = document.querySelector("#feels-like-temp");
let feelsLikeTempUnit = document.querySelector("#feels-like-unit");
let maxTempToday = document.querySelector("#max-temp");
let maxTempTodayUnit = document.querySelector("#max-temp-unit");
let minTempToday = document.querySelector("#min-temp");
let minTempTodayUnit = document.querySelector("#min-temp-unit");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let windSpeedUnit = document.querySelector("#wind-speed-unit");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let lunarPhase = document.querySelector("#lunar-phase");

function showWeather(response) {
  //Get data
  console.log(response);
  let cityName = response.data.name;
  let currentWeatherMain = response.data.weather[0].main;
  console.log(currentWeatherMain);
  let currentWeatherDetail = response.data.weather[0].description;
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTempFeelsLike = Math.round(response.data.main.feels_like);
  let currentMaxTemp = Math.round(response.data.main.temp_max);
  let currentMinTemp = Math.round(response.data.main.temp_min);
  let currentHumidity = response.data.main.humidity;
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let lunarPhaseString = getLunarPhase();
  //Sunrise
  let sunriseUnix = response.data.sys.sunrise;
  function convertSunrise() {
    let sunriseTime = new Date(sunriseUnix * 1000);
    let sunriseHours = sunriseTime.getHours();
    if (sunriseHours < 10) {
      sunriseHours = `0${sunriseHours}`;
    }
    let sunriseMinutes = sunriseTime.getMinutes();
    if (sunriseMinutes < 10) {
      sunriseMinutes = `0${sunriseMinutes}`;
    }
    let sunriseStringFormat = `${sunriseHours}:${sunriseMinutes}`;
    return sunriseStringFormat;
  }
  let sunriseString = convertSunrise();
  //Sunset
  let sunsetUnix = response.data.sys.sunset;
  function convertSunset() {
    let sunsetTime = new Date(sunsetUnix * 1000);
    let sunsetHours = sunsetTime.getHours();
    if (sunsetHours < 10) {
      sunsetHours = `0${sunsetHours}`;
    }
    let sunsetMinutes = sunsetTime.getMinutes();
    if (sunsetMinutes < 10) {
      sunsetMinutes = `0${sunsetMinutes}`;
    }
    let sunsetStringFormat = `${sunsetHours}:${sunsetMinutes}`;
    return sunsetStringFormat;
  }
  let sunsetString = convertSunset();
  //Change HTML
  cityHeader.innerHTML = cityName;
  currentTemperatureNumber.innerHTML = currentTemperature;
  currentWeatherDescription.innerHTML = currentWeatherDetail;
  feelsLikeTemp.innerHTML = currentTempFeelsLike;
  maxTempToday.innerHTML = currentMaxTemp;
  minTempToday.innerHTML = currentMinTemp;
  humidity.innerHTML = currentHumidity;
  windSpeed.innerHTML = currentWindSpeed;
  lunarPhase.innerHTML = lunarPhaseString;
  sunrise.innerHTML = sunriseString;
  sunset.innerHTML = sunsetString;
}

//City Search
function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  if (cityInput.value === null || cityInput.value === "") {
    cityHeader.innerHTML = `Please enter a city!`;
  } else {
    cityHeader.innerHTML = `${cityInput.value}`;
    console.log(cityInput.value);
    let urlCitySearch = `${apiUrlBase}q=${cityInput.value}&appid=${apiKey}&units=metric`;
    console.log(urlCitySearch);
    axios.get(urlCitySearch).then(showWeather);
  }
}

let cityInputForm = document.querySelector("#inputCity");
cityInputForm.addEventListener("submit", updateCity);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);

//Geolocation
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlCurrentPosition = `${apiUrlBase}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(lon);
  console.log(lat);
  console.log(urlCurrentPosition);
  axios.get(urlCurrentPosition).then(showWeather);
}

function geolocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let buttonCurrentPosition = document.querySelector("#current-city-button");
buttonCurrentPosition.addEventListener("click", geolocate);

let temperatureUnit = `metric`;

//Switch between Celcius and Fahrenheit
function handleUnit() {
  let temperatureUnitText = document.querySelectorAll("span.temp-unit");
  if (document.querySelector("#unitToggle").checked) {
    temperatureUnitText.forEach(function (span) {
      span.innerHTML = "°F";
    });
    temperatureUnit = `imperial`;
    console.log(temperatureUnit);
    return temperatureUnit;
  } else {
    temperatureUnitText.forEach(function (span) {
      span.innerHTML = "°C";
    });
    temperatureUnit = `metric`;
    console.log(temperatureUnit);
    return temperatureUnit;
  }
}

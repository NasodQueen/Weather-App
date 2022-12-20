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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return weekdays[day];
}

function displayForecast(response, unit) {
  console.log(response);
  let forecast = response.data.daily;

  //Add day cards to the forecast and change the HTML
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="fiveDayForcast row">`;
  let weatherID = "";
  forecast.forEach(function (forecastDay, index) {
    let celciusMax = Math.round(forecastDay.temp.max);
    let celciusMin = Math.round(forecastDay.temp.min);
    let fahrenheitMax = Math.round((celciusMax * 9) / 5 + 32);
    let fahrenheitMin = Math.round((celciusMin * 9) / 5 + 32);
    if (index < 6 && index > 0) {
      weatherID = String(forecastDay.weather[0].icon);
      forecastHTML =
        forecastHTML +
        `<div class="card col">
    <div class="card-body">
    <h5 class="card-title">${formatForecastDay(forecastDay.dt)}</h5>
    <i id="weather-icon" class="bi ${weatherSet[weatherID].icon}"></i>
    <p class="card-text">
    <span class="forecast-max-temp">${Math.round(celciusMax)}</span
    ><span class="temp-unit">°C</span> |
    <span class="forecast-min-temp">${Math.round(celciusMin)}</span
    ><span class="temp-unit">°C</span>
    </p>
    </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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

//Set misc. variables for later
let apiKey = "c6ca586286ea213d4f29918b81fd9858";
let apiUrlBase = "https://api.openweathermap.org/data/2.5/weather?";
let apiKeyForecast = "57b2c40fdae71a6ba41d72685e3226e2";
let apiUrlForecastBase = "https://api.openweathermap.org/data/2.5/onecall?";
let lunarPhase = document.querySelector("#lunar-phase");

//Create weather set of possible icons from OpenWeatherAPI to use for my own icons and the color sets
let weatherSet = {
  "11d": {
    name: "Thunder",
    icon: "bi-cloud-lightning",
    class: "blue",
  },
  "11n": {
    name: "Thunder",
    icon: "bi-cloud-lightning",
    class: "blue",
  },
  "09d": {
    name: "Drizzle",
    icon: "bi-cloud-drizzle",
    class: "blue",
  },
  "09n": {
    name: "Drizzle",
    icon: "bi-cloud-drizzle",
    class: "blue",
  },
  "10d": {
    name: "Rain",
    icon: "bi-cloud-rain",
    class: "blue",
  },
  "10n": {
    name: "Rain",
    icon: "bi-cloud-rain",
    class: "blue",
  },
  "13d": {
    name: "Snow",
    icon: "bi-snow2",
    class: "white",
  },
  "13n": {
    name: "Snow",
    icon: "bi-snow2",
    class: "white",
  },
  "50d": {
    name: "Mist",
    icon: "bi-cloud-haze2",
    class: "gray",
  },
  "50n": {
    name: "Smoke",
    icon: "bi-cloud-haze2",
    class: "gray",
  },
  "01d": {
    name: "Clear",
    icon: "bi-sun",
    class: "sunshine",
  },
  "01n": {
    name: "Clear",
    icon: "bi-sun",
    class: "sunshine",
  },
  "02d": {
    name: "Few Clouds",
    icon: "bi-cloud-sun",
    class: "gray",
  },
  "02n": {
    name: "Few Clouds",
    icon: "bi-cloud-sun",
    class: "gray",
  },
  "03d": {
    name: "Scattered Clouds",
    icon: "bi-cloudy",
    class: "gray",
  },
  "03n": {
    name: "Scattered Clouds",
    icon: "bi-cloudy",
    class: "gray",
  },
  "04d": {
    name: "Overcast",
    icon: "bi-clouds",
    class: "gray",
  },
  "04n": {
    name: "Overcast",
    icon: "bi-clouds",
    class: "gray",
  },
};

let cityNameHTML = document.querySelector("#city-name");
let mainWeatherTextHTMl = document.querySelector("#header-weather-text");
let mainTemperatureHTML = document.querySelector("#header-temperature-degrees");
let feelsLikeHTML = document.querySelector("#feels-like-temp");
let maxTempHTML = document.querySelector("#max-temp");
let minTempHTML = document.querySelector("#min-temp");
let humidityHTML = document.querySelector("#humidity");
let windHTML = document.querySelector("#wind-speed");

function getForecast(coordinates) {
  let apiUrlForecast = `${apiUrlForecastBase}lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly&appid=${apiKeyForecast}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function showWeather(response) {
  console.log(response);
  //Get data & change HTML
  cityNameHTML.innerHTML = response.data.name;
  mainWeatherTextHTMl.innerHTML = response.data.weather[0].description;
  celciusTemperature = Math.round(response.data.main.temp);
  mainTemperatureHTML.innerHTML = celciusTemperature;
  feelsLikeTemperature = Math.round(response.data.main.feels_like);
  feelsLikeHTML.innerHTML = feelsLikeTemperature;
  maxTemperature = Math.round(response.data.main.temp_max);
  maxTempHTML.innerHTML = maxTemperature;
  minTemperature = Math.round(response.data.main.temp_min);
  minTempHTML.innerHTML = minTemperature;
  humidityHTML.innerHTML = response.data.main.humidity;
  windHTML.innerHTML = Math.round(response.data.wind.speed * 3.6);
  //Sunrise
  let sunriseUnix = response.data.sys.sunrise;
  let timezoneOffset = response.data.timezone * 1000;
  console.log(timezoneOffset);
  function convertSunrise() {
    let sunriseTime = new Date(sunriseUnix * 1000);
    let sunriseString = sunriseTime.toLocaleTimeString();
    console.log(sunriseString);
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
  document.querySelector("#sunrise").innerHTML = convertSunrise();
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
  document.querySelector("#sunset").innerHTML = convertSunset();
  document.querySelector("#lunar-phase").innerHTML = getLunarPhase();
  //Get "main" weather to use for color changes
  let currentWeatherMain = response.data.weather[0].main;
  console.log(currentWeatherMain);
  let currentWeatherID = String(response.data.weather[0].icon);
  console.log(weatherSet[currentWeatherID].icon);
  //Remove any class for the icons that start with "bi-"
  let headerIcon = document.querySelector("#header-icon");
  headerIcon.classList.forEach((item) => {
    if (item.startsWith("bi-")) {
      headerIcon.classList.remove(item);
    }
  });
  //Add the current weather icon
  headerIcon.classList.add(weatherSet[currentWeatherID].icon);
  console.log(headerIcon.classList);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let urlCitySearch = `${apiUrlBase}q=${city}&appid=${apiKey}&units=metric`;
  console.log(urlCitySearch);
  axios.get(urlCitySearch).then(showWeather);
}

//City Search
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity").value;
  recentSearchArray.push(cityInput);
  addRecentSearch();
  console.log(cityInput);
  searchCity(cityInput);
}

let cityInputForm = document.querySelector("#inputCity");
cityInputForm.addEventListener("submit", handleSubmit);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

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

//Switch between Celcius and Fahrenheit
function handleUnit() {
  let temperatureUnitText = document.querySelectorAll(".temp-unit");
  let forecastMax = document.querySelectorAll(".forecast-max-temp");
  let forecastMin = document.querySelectorAll(".forecast-min-temp");
  // let temperatureUnit = "metric";
  if (document.querySelector("#unitToggle").checked) {
    mainTemperatureHTML.innerHTML = Math.round(
      (celciusTemperature * 9) / 5 + 32
    );
    feelsLikeHTML.innerHTML = Math.round((feelsLikeTemperature * 9) / 5 + 32);
    maxTempHTML.innerHTML = Math.round((maxTemperature * 9) / 5 + 32);
    minTempHTML.innerHTML = Math.round((minTemperature * 9) / 5 + 32);
    temperatureUnitText.forEach(function (span) {
      span.innerHTML = "°F";
    });
    forecastMax.forEach(function (span) {
      span.innerHTML = Math.round((span.innerHTML * 9) / 5 + 32);
    });
    forecastMin.forEach(function (span) {
      span.innerHTML = Math.round((span.innerHTML * 9) / 5 + 32);
    });
  } else {
    mainTemperatureHTML.innerHTML = celciusTemperature;
    feelsLikeHTML.innerHTML = feelsLikeTemperature;
    maxTempHTML.innerHTML = maxTemperature;
    minTempHTML.innerHTML = minTemperature;
    temperatureUnitText.forEach(function (span) {
      span.innerHTML = "°C";
    });
    forecastMax.forEach(function (span) {
      span.innerHTML = Math.round(((span.innerHTML - 32) * 5) / 9);
    });
    forecastMin.forEach(function (span) {
      span.innerHTML = Math.round(((span.innerHTML - 32) * 5) / 9);
    });
  }
}

let recentSearchArray = [];
console.log(recentSearchArray.length);

function addRecentSearch(index) {
  if (recentSearchArray.length < 4) {
    let template = recentSearchArray
      .map((city) => `<a href="#" id="${index}">${city}</a>`)
      .join(` `);
    document.querySelector("#recentCitiesSpan").innerHTML = template;
    console.log(recentSearchArray.length);
  } else {
    recentSearchArray.shift();
    let template = recentSearchArray
      .map((city) => `<a href="#" id="${index}">${city}</a>`)
      .join(` `);
    document.querySelector("#recentCitiesSpan").innerHTML = template;
    console.log(recentSearchArray.length);
  }
}

//Popular Cities
function newYorkSearch(event) {
  event.preventDefault;
  searchCity("New York");
}
function parisSearch(event) {
  event.preventDefault;
  searchCity("Paris");
}
function tokyoSearch(event) {
  event.preventDefault;
  searchCity("Tokyo");
}
document
  .querySelector("#new-york-link")
  .addEventListener("click", newYorkSearch);
document.querySelector("#paris-link").addEventListener("click", parisSearch);
document.querySelector("#tokyo-link").addEventListener("click", tokyoSearch);

//Setting up variables for the conversion between °C and °F
let celciusTemperature = null;
let feelsLikeTemperature = null;
let maxTemperature = null;
let minTemperature = null;

//Search on load
searchCity(`Bern`);
